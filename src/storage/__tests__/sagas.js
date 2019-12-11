// @flow

import { eventChannel } from 'redux-saga';
import { getContext } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { fork, call } from 'redux-saga-test-plan/matchers';

import { getLatestBlocksData } from 'src/storage/sagas/latestBlockData';
import {
    checkIsSubscribeNeeded,
    subscribeToNewBlocksData,
    createSocketChannel,
    unsubscribeToNewBlocksData,
} from 'src/storage/sagas/subscribeToNewBlocks';

import {
    loadingLatestBlocksData,
    setLatestBlocksData,
    subscribeToNewBlocks,
    updateLatestBlocksData,
} from 'src/storage/actions/latestBlocksData';

const latestBlocksData = {
    blocks: [{
        difficulty: '2',
        extraData: '0x0',
        gasLimit: 100000,
        gasUsed: 10000000,
        hash: 'string',
        logsBloom: '0x0',
        miner: '0x0',
        nonce: 0,
        number: 0,
        parentHash: '0x0',
        sha3Uncles: '0x0',
        size: 0,
        stateRoot: '0x0',
        timestamp: 1000,
        totalDifficulty: '0x0',
        transactions: 0,
        transactionsRoot: '0x0',
        uncles: [],
    }],
    transactions: [],
};

const newBlockData = {
    blocks: [...latestBlocksData.blocks],
    transactions: [{
        hash: '0x0',
        from: '0x0',
        to: '0x0',
        value: 'string',
        transactionIndex: 1,
    }],
};

const mockedApi = {
    getLatestBlocksData: jest.fn(() => latestBlocksData),
    subscribeToNewBlocks: jest.fn(() => true),
};

const mockedSocketChanel = {
    unsubscribe: jest.fn(),
    returnData: jest.fn(),
    returnError: jest.fn(),
};

const createSocketChannelMock = jest.fn(() => eventChannel((emit) => {
    mockedSocketChanel.returnData = jest.fn(() => emit(newBlockData));
    mockedSocketChanel.returnError = jest.fn(() => emit(new Error('Mock Error')));

    return () => {
        mockedSocketChanel.unsubscribe();
    }
}));

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

describe('Redux saga: checkIsSubscribeNeeded', function checkIsSubscribeNeededSaga() {
    it('should return correct data for disabled realtime update', function() {
        return expectSaga(checkIsSubscribeNeeded)
            .provide({
                select() {
                    return { isRealtimeUpdate: false };
                },
            })
            .run();
    });

    it('should return correct data for enabled realtime update', function() {
        return expectSaga(checkIsSubscribeNeeded)
            .provide({
                select() {
                    return { isRealtimeUpdate: true };
                },
            })
            .put(subscribeToNewBlocks())
            .run();
    });
});

describe('Redux saga: subscribeToNewBlocksData', function subscribeToNewBlocksDataSaga() {
    it('should return correct data ', async function() {
        const socketChannelMock = createSocketChannelMock();
        setTimeout(mockedSocketChanel.returnData, 100);
        setTimeout(mockedSocketChanel.returnError, 100);
        setTimeout(socketChannelMock.close, 200);

        const result = await expectSaga(subscribeToNewBlocksData)
            .provide([
                [getContext('api'), mockedApi],
                [call.fn(createSocketChannel, null), socketChannelMock],
                [fork.fn(unsubscribeToNewBlocksData, socketChannelMock)],
            ])
            .call([mockedApi, mockedApi.subscribeToNewBlocks])
            .put(updateLatestBlocksData(newBlockData))
            .silentRun();

        expect(mockedSocketChanel.returnData).toBeCalled();
        expect(mockedSocketChanel.returnError).toBeCalled();
        expect(mockedSocketChanel.unsubscribe).toBeCalled();

        return result;
    });
});
