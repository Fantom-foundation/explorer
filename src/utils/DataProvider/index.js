// @flow

import Web3Provider from 'src/utils/DataProvider/web3Provider';
import RestProvider from 'src/utils/DataProvider/restProvider';

import type { DataProvider } from 'src/utils/types';

const providers = {
    web3: Web3Provider,
    rest: RestProvider,
};

let _provider: ?DataProvider = null;

export function useDataProvider() {
    if (!_provider) {
        throw Error('DataProvider is not init');
    }

    return _provider;
}

export default class {
    constructor(name: string): DataProvider {
        if (!_provider) {
            if (providers.hasOwnProperty(name)) {
                _provider = new providers[name]();

                return _provider;
            }

            throw Error(`DataProvider with name ${name} does not exist`);
        } else {
            return _provider;
        }
    }
}