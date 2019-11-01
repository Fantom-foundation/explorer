// @flow

import Web3 from 'web3';

import type { DataProvider } from './types';

const API_URL = process.env.REACT_APP_API_URL_FANTOM;

let _web3: Web3  = null;
let _provider: ?DataProvider = null;

class Web3Provider implements DataProvider {
    constructor() {
        if (!_provider) {
            _web3 = new Web3(API_URL);
            _provider = this;

            return this;
        }

        return _provider;
    }

    async getLatestBlocks() {
        try {
            const blockNumber = await _web3.eth.getBlockNumber();

            return this.getBlocks(blockNumber - 6, 6, [true]);
        } catch(err) {
            console.log(err);
        }
    }

    getBlocks(fromBlock: ?number = 0, count: ?number = 25, getBlockParams: [boolean] | [] = []): Promise<any> {
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
}

export default Web3Provider;
