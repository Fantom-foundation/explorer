// @flow

import apiInterface from './apiInterface';

import type {
    DataProvider,
} from '../types';

let _provider: ?DataProvider = null;

class RestProvider implements DataProvider {
    constructor() {
        if (!_provider) {
            _provider = this;

            return this;
        }

        return _provider;
    }

    async getLatestBlocksData() {
        try {
            const response = await apiInterface.getApiV1GetLatestData();

            if (response.error) {
                return {
                    error: Error(response.error),
                }
            }

            return response;
        } catch(err) {
            return {
                error: err,
            };
        }
    }

    async getBlock(
        blockNumber: number | string,
        withTransactions: ?boolean,
    ) {
        try {
            const response = await apiInterface.getApiV1GetBlock({ blockNumber });

            if (response.error) {
                return {
                    error: Error(response.error),
                };
            }

            return {
                blockData: [response],
            };

        } catch(err) {
            return {
                error: err,
            }
        }
    }

    async getBlocksPageData(
        offset?: number,
        count?: number,
        order?: number,
    ) {
        try {
            const response = await apiInterface.getApiV1GetBlocks({ offset, count, order });

            if (response.error) {
                return {
                    error: Error(response.error),
                };
            }

            return {
                maxBlockHeight: response.total,
                blocks: response.docs,
            };
        } catch(err) {
            return {
                error: err,
            };
        }
    }

    async getTransaction(
        transactionHash: string,
    ) {
        try {
            const response = await apiInterface.getApiV1GetTransaction({ transactionHash });

            if (response.error) {
                return {
                    error: Error(response.error),
                };
            }

            return {
                transactionData: [response],
            };
        } catch (err) {
            return {
                error: err,
            };
        }
    }

    async getTransactionsPageData(
        offset?: number,
        count?: number,
        order?: number,
    ) {
        try {
            const response = await apiInterface.getApiV1GetTransactions({ offset, order, count });

            if (response.error) {
                return {
                    error: Error(response.error),
                };
            }

            return {
                maxBlockHeight: response.total,
                transactions: response.transactions,
            };
        } catch(err) {
            return {
                error: err,
            };
        }
    }

    subscribeToNewBlocks() {
        return {};
    }
}

export default RestProvider;
