// @flow

import axios from 'axios';

export type meta = {
    success: boolean,
};
export type Block = {|
    uncles: Array < string >
    ,
    difficulty: string,
    extraData: string,
    gasLimit: number,
    gasUsed: number,
    hash: string,
    logsBloom: string,
    miner: string,
    nonce: number,
    number: number,
    parentHash: string,
    sha3Uncles: string,
    size: number,
    stateRoot: string,
    timestamp: number,
    totalDifficulty: string,
    transactions: number,
    transactionsRoot: string,
|};
export type Transaction = {|
    blockHash: string,
    blockNumber: number,
    from: string,
    hash: string,
    value: string,
    nonce: number,
    r: string,
    s: string,
    v: string,
    gas: number,
    gasUsed: number,
    gasPrice: string,
    input: string,
    transactionIndex: number,
    timestamp: number,
    cumulativeGasUsed: number,
    logs: Array < {} >
    ,
    fee: string,
    status: boolean,
    to: string,
|};
export type TransactionForAccountEndpoint = {|
    from: string,
    hash: string,
    value: string,
    nonce: number,
    gasUsed: number,
    gasPrice: string,
    timestamp: number,
    fee: string,
    to: string,
|};


const baseURL = process.env.REACT_APP_REST_API_URL_FANTOM;
const requestInstance = axios.create({
    baseURL: baseURL || '',
});

export default class ApiProvider {
    static request(
        path: string,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH',
        query: {
            [string]: mixed
        },
        body ? : {
            [string]: any
        } | string | Array < any > ,
    ) {
        return requestInstance.request({
            url: path,
            method,
            params: query,
        })
            .then((response) => {
                const { data: res } = response.data;

                if (res.meta.success === false) {
                    throw Error(res.meta.message);
                }

                return res;
            });
    }
    static async getApiV1GetBlocks(
        parameters: {
            'offset' ? : number,
            'count' ? : number,
            'order' ? : number,
        }
    ): Promise < {
        meta: meta,
        data: {
            total: number,
            offset: number,
            count: number,
            blocks: Array < Block >
            ,
        },
    } >
    {
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

        return await this.request(path, 'GET', query, body);
    }
    static async getApiV1GetTransaction(
        parameters: {
            'transactionHash': string,
        }
    ): Promise < {
        meta: meta,
        data: {
            transaction: Transaction,
        },
    } >
    {
        let path = '/api/v1/get-transaction';
        let body;
        let query = {};
        if (parameters['transactionHash'] === undefined) {
            throw new Error('Missing required  parameter: transactionHash');
        }

        if (parameters['transactionHash'] !== undefined) {
            query['transactionHash'] = parameters['transactionHash'];
        }

        return await this.request(path, 'GET', query, body);
    }
    static async getApiV1GetBlock(
        parameters: {
            'blockNumber': number,
        }
    ): Promise < {
        meta: meta,
        data: {
            block: Block,
        },
    } >
    {
        let path = '/api/v1/get-block';
        let body;
        let query = {};
        if (parameters['blockNumber'] === undefined) {
            throw new Error('Missing required  parameter: blockNumber');
        }

        if (parameters['blockNumber'] !== undefined) {
            query['blockNumber'] = parameters['blockNumber'];
        }

        return await this.request(path, 'GET', query, body);
    }
    static async getApiV1GetAccount(
        parameters: {
            'address': string,
            'offset' ? : number,
            'count' ? : number,
            'trxsFilter' ? : string,
        }
    ): Promise < {
        meta: meta,
        data: {
            account: {
                address: string,
                balance: string,
                nonce: number,
                totalTrxs: number,
                offsetTrxs: number,
                countTrxs: number,
                transactions: Array < TransactionForAccountEndpoint >
                ,
            },
        },
    } >
    {
        let path = '/api/v1/get-account';
        let body;
        let query = {};
        if (parameters['address'] === undefined) {
            throw new Error('Missing required  parameter: address');
        }

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
            'offset' ? : number,
            'count' ? : number,
            'order' ? : number,
            'block' ? : number,
        }
    ): Promise < {
        meta: meta,
        data: {
            total: number,
            offset: number,
            count: number,
            transactions: Array < Transaction >
            ,
        },
    } >
    {
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

        if (parameters['block'] !== undefined) {
            query['block'] = parameters['block'];
        }

        return await this.request(path, 'GET', query, body);
    }
    static async getApiV1GetLatestData(
        parameters: {
            'count' ? : number,
        }
    ): Promise < {
        meta: meta,
        data: {
            count: number,
            blocks: Array < Block >
            ,
            transactions: Array < Transaction >
            ,
        },
    } >
    {
        let path = '/api/v1/get-latest-data';
        let body;
        let query = {};

        if (parameters['count'] !== undefined) {
            query['count'] = parameters['count'];
        }

        return await this.request(path, 'GET', query, body);
    }
}