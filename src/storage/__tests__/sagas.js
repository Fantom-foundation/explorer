// @flow

jest.mock('src/storage/actions/latestBlocksData');
jest.mock('src/storage/sagas/subscribeToNewBlocks');

import { getContext } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { fork } from 'redux-saga-test-plan/matchers';

import { getLatestBlocksData } from 'src/storage/sagas/latestBlockData';

import {
    loadingLatestBlocksData,
    setLatestBlocksData,
} from 'src/storage/actions/latestBlocksData';

import {
    checkIsSubscribeNeeded,
} from 'src/storage/sagas/subscribeToNewBlocks';

const latestBlocksData = {
    blocks: [{
        difficulty: '2',
        extraData: '0x0',
        gasLimit: 100000,
        gasUsed: 10000000,
        hash: 'string',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        number: 0,
        parentHash: '0x0',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: 0,
        stateRoot: '0x0',
        timestamp: 1000,
        totalDifficulty: '0x0',
        transactions: [],
        transactionsRoot: '0x0',
        uncles: [],
    }],
    transactions: [],
};

type latestBlocksDataType = typeof latestBlocksData;

loadingLatestBlocksData.mockImplementation((status: boolean) => ({
    type: 'STRING',
    payload: status,
}));

setLatestBlocksData.mockImplementation((latestBlocksData: latestBlocksDataType) => ({
    type: 'STRING',
    payload: latestBlocksData,
}));

const mockedApi = {
    getLatestBlocksData: jest.fn(() => latestBlocksData),
};

describe('Redux saga: latestBlocksData', function getLatestBlocksSaga() {
    it('should return correct data', function () {
        return expectSaga(getLatestBlocksData)
            .provide([
                [getContext('api'), mockedApi],
                [fork.fn(checkIsSubscribeNeeded)],
            ])
            .put(loadingLatestBlocksData(true))
            .call([mockedApi, mockedApi.getLatestBlocksData])
            .put(setLatestBlocksData(latestBlocksData))
            .put(loadingLatestBlocksData(false))
            .run();
    });
});