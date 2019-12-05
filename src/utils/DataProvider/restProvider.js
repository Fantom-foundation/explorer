// @flow

import type {
    DataProvider,
} from '../types';

let _provider: ?DataProvider = null;
let _hidden = {
    getData: () => [1, 2, 3],
};

class RestProvider implements DataProvider {
    constructor() {
        if (!_provider) {
            _provider = this;

            return this;
        }

        return _provider;
    }

    async getLatestBlocksData() {
        return {};
    }
}

export default RestProvider;
