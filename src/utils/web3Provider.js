// @flow

import Web3 from 'web3';

import type {
    DataProvider,
    Block,
    LatestBlocksData,
    RequestError,
    Transaction,
    SubscriptionToNewBlocks,
    TransactionReceipt,
} from './types';

const API_URL = process.env.REACT_APP_API_URL_FANTOM;

let _web3: Web3  = null;
let _provider: ?DataProvider = null;

class Web3Provider implements DataProvider {
    constructor() {
        if (!_provider) {
            _web3 = new Web3(API_URL);
            _provider = this;

            if (window) {
                window.web3Provider = this;
            }

            return this;
        }

        return _provider;
    }

    async getLatestBlocksData(): Promise<LatestBlocksData | RequestError> {
        try {
            let blockNumber = await _web3.eth.getBlockNumber();
            let result = {
                blocks: [],
                transactions: []
            };

            while (result.transactions.length < 10) {
                const blocks = await this.getBlocks(blockNumber - 10, 10, [true]);

                blocks.forEach((block) => {
                    const transactions = block.transactions;

                    if (result.blocks.length < 10) {
                        block.transactions = transactions.map((transaction) => transaction.hash);
                        result.blocks.push(block);
                    }

                    if (result.transactions.length < 10) {
                        for (let i = 0, transactionLength = transactions.length; i < transactionLength; i++) {
                            result.transactions.push(transactions[i]);

                            if (result.transactions.length === 10) {
                                break;
                            }
                        }
                    }
                });

                blockNumber = blockNumber - 10;
            }

            return result;
        } catch(err) {
            console.log(err);
            return { error: 'Cant\'t get latest blocks data.' }
        }
    }

    async getBlocks(
        fromBlock: ?number = 0,
        count: ?number = 25,
        getBlockParams: [boolean] | [] = [],
    ): Promise<Array<Block<Transaction | string>>> {
        return new Promise((resolve, reject) => {
            const toBlock = fromBlock + count;
            const batch = new _web3.eth.BatchRequest();
            const response = [];
            const callback = (error: Error, data: any) => {
                if (error) {
                    reject(error);
                }

                response.unshift(data);

                if (data.number === toBlock) {
                    resolve(response);
                }
            };

            for (let i = fromBlock + 1; i <= toBlock; i++) {
                batch.add(_web3.eth.getBlock.request(i, ...getBlockParams, callback));
            }

            batch.execute();
        });
    }

    subscribeToNewBlocks(): SubscriptionToNewBlocks {
        return _web3.eth.subscribe('newBlockHeaders');
    }

    async getNewBlockData(number: number): Promise<LatestBlocksData> {
        let result: ?Block<Transaction> = null;

        while (!result) {
            result = await _web3.eth.getBlock(number, true);

            if (!result) {
                await (new Promise((resolve) => setTimeout(resolve, 1500)));
            }
        }

        const txIds: Array<string> = [];

        const transactions = result.transactions.map((tx) => {
            txIds.push(tx.hash);

            return tx;
        });

        const block: Block<string> = {
            ...result,
            transactions: txIds,
        };

        return {
            blocks: [block],
            transactions,
        };
    }

    async getBlock(blockNumber: number | string, withTransactions: ?boolean) {
        try {
            const block = await _web3.eth.getBlock(blockNumber, withTransactions);

            return { blockData: [block] };
        } catch(err) {
            return { error: err };
        }
    }

    async getTransaction(transactionHash: string) {
        try {
            const [transaction, transactionReceipt]: [Transaction, TransactionReceipt] = await Promise.all([
                _web3.eth.getTransaction(transactionHash),
                _web3.eth.getTransactionReceipt(transactionHash),
            ]);

            return { transactionData: [{ ...transaction, ...transactionReceipt }] };
        } catch(err) {
            return { error: err };
        }
    }

    async getBlocksPageData(
        offset: number = 0,
        count: number = 10
    ) {
        try {
            const maxBlockHeight: number = await _web3.eth.getBlockNumber();
            const blocks = await this.getBlocks(maxBlockHeight - offset, count);

            return { maxBlockHeight, blocks };
        } catch(err) {
            return { error: err };
        }
    }
}

export default Web3Provider;
