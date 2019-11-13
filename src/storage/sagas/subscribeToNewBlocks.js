// @flow

import {
    fork,
    call,
    put,
    takeLeading,
    getContext,
    select,
    take,
    race,
    takeEvery
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
    getRealtimeUpdateDetails,
} from 'src/storage/selectors/realtimeBlockchainUpdate';

import {
    SUBSCRIBE_TO_NEW_BLOCKS,
    UNSUBSCRIBE_TO_NEW_BLOCKS,
    SET_REALTIME_UPDATE,
    REQUEST_BLOCK_DATA,
} from 'src/storage/constants';

import {
    updateLatestBlocksData,
    subscribeToNewBlocks,
    requestBlockData,
} from 'src/storage/actions/latestBlocksData';

import type { Saga, EventChannel } from 'redux-saga';
import type { SubscriptionToNewBlocks, DataProvider, BlockHeader } from 'src/utils/types';
import type { Action } from 'src/storage/types';

function createSocketChannel(socket: SubscriptionToNewBlocks) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel((emit) => {
        const pingHandler = (blockHead) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            emit(blockHead);
        };

        const errorHandler = (error) => {
            // create an Error object and put it into the channel
            emit(new Error(error));
        };

        // setup the subscription
        socket.on('data', pingHandler);
        socket.on('error', errorHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method

        return () => {
            socket.unsubscribe((err, res) => console.log('Unsubscribe: ', res));
        };
    })
}

function* unsubscribeToNewBlocksData(subChannel: EventChannel<any>): Saga<void> { // TODO: add correct EventChannel type
    const [, realtimeUpdate] = yield race([
        take(UNSUBSCRIBE_TO_NEW_BLOCKS),
        take(SET_REALTIME_UPDATE),
    ]);

    if (realtimeUpdate && realtimeUpdate.realtimeUpdate && !realtimeUpdate.realtimeUpdate.isRealtimeUpdate) {
        subChannel.close();
    } else if (!realtimeUpdate) {
        subChannel.close();
    }
}

function* subscribeToNewBlocksData(): Saga<void> {
    const api: DataProvider = yield getContext('api');

    const subscription: SubscriptionToNewBlocks = yield call([api, api.subscribeToNewBlocks]);
    const subscriptionChannel = yield call(createSocketChannel, subscription);

    yield fork(unsubscribeToNewBlocksData, subscriptionChannel);

    while (true) {
        try {
            // An error from socketChannel will cause the saga jump to the catch block
            const payload = yield take(subscriptionChannel);
            console.log(`new block: ${payload.number}`);
            yield put(requestBlockData(payload));
        } catch(err) {
            console.error('socket error:', err)
            // socketChannel is still open in catch block
            // if we want end the socketChannel, we need close it explicitly
            // socketChannel.close()
        }
    }
}

export function* checkIsSubscribeNeeded(): Saga<void> {
    const { isRealtimeUpdate } = yield select(getRealtimeUpdateDetails());

    if (isRealtimeUpdate) {
        yield put(subscribeToNewBlocks());
    }
}

export function* requestBlockDataSaga(action: Action<string, BlockHeader>): Saga<void> {
    const api: DataProvider = yield getContext('api');
    const { payload: { number } = {} } = action;

    const newBlockData = yield call([api, api.getNewBlockData], number);
    yield put(updateLatestBlocksData(newBlockData));
}

export default function* watchSubscribeToNewBlocks(): Saga<void> {
    yield takeLeading(SUBSCRIBE_TO_NEW_BLOCKS, subscribeToNewBlocksData);
    yield takeEvery(REQUEST_BLOCK_DATA, requestBlockDataSaga);
}