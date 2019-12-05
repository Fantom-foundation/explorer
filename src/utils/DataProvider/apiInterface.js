// @flow

import axios from 'axios';

import type {
    LatestBlocksData,
    Block,
    DetailTransaction,
    Transaction,
} from 'src/utils/types';

const baseURL = process.env.REACT_APP_REST_API_URL_FANTOM;
const requestInstance = axios.create({
    baseURL: baseURL || '',
});

export default class ApiProvider {
    static request<R: { [key: string]: any }>(
        path: string,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH',
        query: {
            [string]: mixed
        },
        body ? : {
            [string]: any
        } | string | Array < any > ,
    ): Promise<R | {| error: string |}> {
        return requestInstance.request<any, any>({
            url: path,
            method,
            params: query,
        })
            .then((response) => {
                const { data } = response.data;

                return data;
            })
            .catch((err) => {
                const {
                    data: { error },
                } = err.response;

                return { error };
            });
    }
    static async getApiV1GetBlocks(
        parameters: {
            'offset' ? : number,
            'count' ? : number,
            'order' ? : number,
        }
    ) {
        let path = '/api/v1/get-blocks';
        let body;
        let query = {};

        if (parameters['offset'] !== undefined) {
            query['offset'] = parameters['offset'];
        }

        if (parameters['count'] !== undefined) {
            query['count'] = parameters['count'];
        }

        if (parameters['order'] !== undefined) {
            query['order'] = parameters['order'];
        }

        return await this.request<{|
            count: number,
            docs: Array<Block<string>>,
            offset: number,
            total: number,
        |}>(path, 'GET', query, body);
    }
    static async getApiV1GetTransaction(
        parameters: {
            'transactionHash': string,
        }
    ) {
        let path = '/api/v1/get-transaction';
        let body;
        let query = {};

        if (parameters['transactionHash'] !== undefined) {
            query['transactionHash'] = parameters['transactionHash'];
        }

        return await this.request<DetailTransaction>(path, 'GET', query, body);
    }
    static async getApiV1GetBlock(
        parameters: {
            'blockNumber': number | string,
        }
    ) {
        let path = '/api/v1/get-block';
        let body;
        let query = {};

        if (parameters['blockNumber'] !== undefined) {
            query['blockNumber'] = parameters['blockNumber'];
        }

        return await this.request<Block<string>>(path, 'GET', query, body);
    }
    static async getApiV1GetAccount(
        parameters: {
            'address' ? : string,
            'offset' ? : string,
            'count' ? : string,
            'trxsFilter' ? : string,
        }
    ) {
        let path = '/api/v1/get-account';
        let body;
        let query = {};

        if (parameters['address'] !== undefined) {
            query['address'] = parameters['address'];
        }

        if (parameters['offset'] !== undefined) {
            query['offset'] = parameters['offset'];
        }

        if (parameters['count'] !== undefined) {
            query['count'] = parameters['count'];
        }

        if (parameters['trxsFilter'] !== undefined) {
            query['trxsFilter'] = parameters['trxsFilter'];
        }

        return await this.request(path, 'GET', query, body);
    }
    static async getApiV1GetTransactions(
        parameters: {
            'offset' ? : string,
            'count' ? : string,
            'order' ? : string,
        }
    ) {
        let path = '/api/v1/get-transactions';
        let body;
        let query = {};

        if (parameters['offset'] !== undefined) {
            query['offset'] = parameters['offset'];
        }

        if (parameters['count'] !== undefined) {
            query['count'] = parameters['count'];
        }

        if (parameters['order'] !== undefined) {
            query['order'] = parameters['order'];
        }

        return await this.request<{
            count: number,
            docs: Array<Transaction>,
            offset: number,
            total: number,
        }>(path, 'GET', query, body);
    }
    static async getApiV1GetLatestData(
        parameters?: {
            'count' ? : string,
        } = {}
    ) {
        let path = '/api/v1/get-latest-data';
        let body;
        let query = {};

        if (parameters['count'] !== undefined) {
            query['count'] = parameters['count'];
        }

        return await this.request<LatestBlocksData>(path, 'GET', query, body);
    }
}