// @flow

import { getContext } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { getLatestBlocksData } from 'src/storage/sagas/latestBlockData';
import {
    loadingLatestBlocksData,
    setLatestBlocksData,
} from 'src/storage/actions/latestBlocksData';

const latestBlocksData = {
    blocks: [{ hash: 'string' }],
    transactions: [],
};

const mockedApi = {
    getLatestBlocksData: jest.fn(() => latestBlocksData),
};

describe('Redux saga: latestBlocksData', function getLatestBlocksSaga() {
    it('should return correct data', function () {
        return expectSaga(getLatestBlocksData)
            .provide([[getContext('api'), mockedApi]])
            .put(loadingLatestBlocksData(true))
            .call([mockedApi, mockedApi.getLatestBlocksData])
            .put(setLatestBlocksData(latestBlocksData))
            .run();
    });
});