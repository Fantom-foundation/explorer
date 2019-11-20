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
} from '../types';

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
                const blocks: Array<Block<Transaction>> = await this.getBlocks(blockNumber - 10, 10, [true]);

                blocks.forEach((block) => {
                    const transactions = block.transactions;

                    if (result.blocks.length < 10) {
                        result.blocks.push({
                            ...block,
                            transactions: transactions.map((transaction) => transaction.hash),
                        });
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

            return {
                error: Error('Cant\'t get latest blocks data.'),
            };
        }
    }

    async getBlocks<T: Transaction | string>(
        fromBlock: ?number = 0,
        count: ?number = 25,
        getBlockParams: [boolean] | [] = [],
    ): Promise<Array<Block<T>>> {
        return new Promise((resolve, reject) => {
            const toBlock = fromBlock + count;
            const batch = new _web3.eth.BatchRequest();
            const response = [];
            const callback = (error: Error, data: any, last: boolean) => {
                if (error) {
                    reject(error);
                }

                response.unshift(data);

                if (last) {
                    resolve(response);
                }
            };

            for (let i = fromBlock + 1; i <= toBlock; i++) {
                batch.add(_web3.eth.getBlock.request(
                    i,
                    ...getBlockParams,
                    (error: Error, data: any) => callback(error, data, i === toBlock),
                ));
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

    async getBlock(
        blockNumber: number | string,
        withTransactions: ?boolean
    ) {
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
            const blocks: Array<Block<string>> = await this.getBlocks(maxBlockHeight - offset, count);

            return { maxBlockHeight, blocks };
        } catch(err) {
            return { error: err };
        }
    }

    async _getTransactionsByIDs(txsHash: Array<string>) {
        return new Promise((resolve, reject) => {
            const length = txsHash.length;
            const batch = new _web3.eth.BatchRequest();
            const response = [];
            const callback = (error: Error, data: any) => {
                if (error) {
                    reject(error);
                }

                response.push(data);

                if (response.length === length) {
                    resolve(response);
                }
            };

            for (let i = 0; i < length; i++) {
                batch.add(_web3.eth.getTransaction.request(txsHash[i], callback));
            }

            batch.execute();
        });
    }

    async getTransactionsPageData(
        offset: number = 0,
        count: number = 10,
    ) {
        try {
            let transactionsHash = [];
            let offsetLeft = offset;
            const maxBlockHeight: number = await _web3.eth.getBlockNumber();
            let blockNumber = maxBlockHeight - 10;

            while (transactionsHash.length < count) {
                const blocks: Array<Block<string>> = await this.getBlocks(blockNumber, 10);

                for (let i = 0, len = blocks.length; i < len; i++) {
                    const block = blocks[i];

                    if (!block) {
                        continue;
                    }

                    const { transactions } = block;

                    if (offsetLeft >= transactions.length) {
                        offsetLeft -= transactions.length;
                        continue;
                    } else if (offsetLeft > 0) {
                        transactionsHash.push(...transactions.splice(offsetLeft, count - transactionsHash.length));
                        offsetLeft = 0;
                    } else {
                        transactionsHash.push(...transactions.splice(0, count - transactionsHash.length));
                    }

                    if (transactionsHash.length === count) {
                        break;
                    }
                }

                if (transactionsHash.length < count) {
                    blockNumber -= 10;
                }
            }

            const result = await this._getTransactionsByIDs(transactionsHash);

            return {
                maxBlockHeight,
                transactions: result,
            };
        } catch(err) {
            return { error: err.message };
        }
    }
}

export default Web3Provider;
