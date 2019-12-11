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
} from 'src/utils/types';

type Web3Block<T: Transaction | string> = {|
    ...Block,
    transactions: Array<T>,
|};

const API_URL = process.env.REACT_APP_API_URL_FANTOM;

let _web3: Web3 = null;

class Web3Provider implements DataProvider {
    constructor() {
        _web3 = new Web3(API_URL);
    }

    async getLatestBlocksData(): Promise<LatestBlocksData | RequestError> {
        try {
            let offset = 0;
            let result = {
                blocks: [],
                transactions: []
            };

            while (result.transactions.length < 10 && offset < 100) {
                const { blocks } = await this._getBlocks<Transaction>(offset, 10, [true]);

                blocks.forEach((block) => {
                    const transactions = block.transactions;

                    if (result.blocks.length < 10) {
                        result.blocks.push({
                            ...block,
                            transactions: transactions.length,
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

                offset += 10;
            }

            return result;
        } catch(err) {
            console.log(err);

            return {
                error: Error('Cant\'t get latest blocks data.'),
            };
        }
    }

    async _getBlocks<T: Transaction | string, R = Web3Block<T>>(
        offset?: number = 0,
        count?: number = 25,
        getBlockParams?: [boolean] | [] = [],
    ): Promise<{| maxBlockHeight: number, blocks: Array<R> |}> {
        const currentBlocksHeight: number = await _web3.eth.getBlockNumber();

        return new Promise((resolve, reject) => {
            let fromBlock = currentBlocksHeight - offset;

            if (fromBlock < 0) {
                resolve({ maxBlockHeight: currentBlocksHeight, blocks: [] });
                return;
            }

            const response = [];

            const batch = new _web3.eth.BatchRequest();
            const callback = (error: Error, data: R, last: boolean) => {
                if (error) {
                    reject(error);
                }

                response.unshift(data);

                if (last) {
                    resolve({ maxBlockHeight: currentBlocksHeight, blocks: response });
                }
            };

            for (let i = 1; i <= count; i++, fromBlock--) {
                batch.add(_web3.eth.getBlock.request(
                    fromBlock,
                    ...getBlockParams,
                    (error: Error, data: R) => callback(error, data, i === count),
                ));
            }

            batch.execute();
        });
    }

    subscribeToNewBlocks(): SubscriptionToNewBlocks {
        const socket: SubscriptionToNewBlocks = _web3.eth.subscribe('newBlockHeaders');

        socket.on('data', (data) => {
            const { number } = data;
            this._getNewBlockData(number)
                .then((data) => socket.emit('blockData', data));
        });

        return socket;
    }

    async _getNewBlockData(number: number): Promise<LatestBlocksData> {
        let result: ?Web3Block<Transaction> = null;

        while (!result) {
            result = await _web3.eth.getBlock(number, true);

            if (!result) {
                await (new Promise((resolve) => setTimeout(resolve, 1500)));
            }
        }

        const { transactions } = result;

        const block: Block = {
            ...result,
            transactions: transactions.length,
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
            const {
                logsBloom,
                transactionHash: x,
                ...restTransactionReceipt
            } = transactionReceipt;

            return {
                transactionData: [{
                    ...transaction,
                    ...restTransactionReceipt,
                }],
            };
        } catch(err) {
            return { error: err };
        }
    }

    async getBlocksPageData(
        offset: number = 0,
        count: number = 10
    ) {
        try {
            const { maxBlockHeight, blocks: web3Blocks } = await this._getBlocks<string>(offset, count);
            const blocks = web3Blocks.map<Block>((block) => ({ ...block, transactions: block.transactions.length }));

            return {
                maxBlockHeight,
                blocks,
                total: maxBlockHeight,
            };
        } catch(err) {
            return { error: err };
        }
    }

    async _getTransactionsByIDs(txsHash: Array<string>) {
        return new Promise((resolve, reject) => {
            const length = txsHash.length;
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

            if(txsHash.length > 0) {
                const batch = new _web3.eth.BatchRequest();

                for (let i = 0; i < length; i++) {
                    batch.add(_web3.eth.getTransaction.request(txsHash[i], callback));
                }

                batch.execute();
            } else {
                resolve(response);
            }
        });
    }

    async getTransactionsPageData(
        offset?: number = 0,
        count?: number = 10,
    ) {
        try {
            let transactionsHash = [];
            let offsetLeft = offset;
            let currentOffset = offset;
            let maxBlockHeight = 0;

            while (transactionsHash.length < count && currentOffset < offset + 100) {
                const { blocks } = await this._getBlocks<string>(currentOffset, 10);

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
                    currentOffset += 10;
                }
            }

            const result = await this._getTransactionsByIDs(transactionsHash);

            if (result.length === 0) {
                throw Error('Have no transactions yet');
            }

            return {
                maxBlockHeight,
                transactions: result,
                total: offset + result.length + count,
            };
        } catch(err) {
            return { error: err };
        }
    }

    async getTransactionsByBlockNumber(blockNumber: number, offset?: number) {
        try {
            const { transactions }: Web3Block<Transaction> = await _web3.eth.getBlock(blockNumber, true);

            return { blockData: transactions, total: transactions.length };
        } catch (e) {
            return { error: e };
        }
    }
}

export default Web3Provider;
