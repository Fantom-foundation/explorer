// @flow

import apiInterface from './apiInterface';
import SubscribeToNewBlocks from './socketInterface';

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
            const { data } = await apiInterface.getApiV1GetLatestData({});

            return {
                blocks: data.blocks,
                transactions: data.transactions,
            }
        } catch(err) {
            return {
                error: err,
            };
        }
    }

    async getBlock(
        blockNumber: number,
        withTransactions: ?boolean,
    ) {
        try {
            const { data } = await apiInterface.getApiV1GetBlock({ blockNumber });

            return {
                blockData: [data.block],
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
            const { data } = await apiInterface.getApiV1GetBlocks({ offset, count, order });

            return {
                maxBlockHeight: data.total,
                blocks: data.blocks,
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
            const { data } = await apiInterface.getApiV1GetTransaction({ transactionHash });

            return {
                transactionData: [data.transaction],
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
            const { data } = await apiInterface.getApiV1GetTransactions({ offset, order, count });

            return {
                maxBlockHeight: data.total,
                transactions: data.transactions,
            };
        } catch(err) {
            return {
                error: err,
            };
        }
    }

    subscribeToNewBlocks() {
        return new SubscribeToNewBlocks();
    }
}

export default RestProvider;
