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
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
    getRealtimeUpdateDetails,
} from 'src/storage/selectors/realtimeBlockchainUpdate';

import {
    SUBSCRIBE_TO_NEW_BLOCKS,
    UNSUBSCRIBE_TO_NEW_BLOCKS,
    SET_REALTIME_UPDATE,
} from 'src/storage/constants';

import {
    updateLatestBlocksData
} from 'src/storage/actions/latestBlocksData';

import type { Saga, EventChannel } from 'redux-saga';

function createSocketChannel(socket) {
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
            socket.unsubscribe((err, res) => console.log(res));
        };
    })
}

function* unsubscribeToNewBlocks(subChannel: EventChannel<any>): Saga<void> { // TODO: add correct EventChannel type
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

function* subscribeToNewBlocks(): Saga<void> {
    console.log('Fired subscribeToNewBlocks!');
    const api = yield getContext('api');

    const subscription = yield call([api, api.subscribeToNewBlocks]);
    const subscriptionChannel = yield call(createSocketChannel, subscription);

    yield fork(unsubscribeToNewBlocks, subscriptionChannel);

    while (true) {
        try {
            // An error from socketChannel will cause the saga jump to the catch block
            const payload = yield take(subscriptionChannel);

            yield put(updateLatestBlocksData(payload));
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
        yield put({ type: SUBSCRIBE_TO_NEW_BLOCKS });
    }
}

export default function* watchSubscribeToNewBlocks(): Saga<void> {
    yield takeLeading(SUBSCRIBE_TO_NEW_BLOCKS, subscribeToNewBlocks);
}