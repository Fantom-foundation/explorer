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
    updateLatestBlocksData,
    subscribeToNewBlocks,
} from 'src/storage/actions/latestBlocksData';

import type { Saga, EventChannel } from 'redux-saga';
import type {
    SubscriptionToNewBlocks,
    DataProvider,
    NewBlockData,
} from 'src/utils/types';
import type {
    RealTimeUpdateAction
} from 'src/storage/types';

export function createSocketChannel(socket: SubscriptionToNewBlocks): EventChannel<any> {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel((emit) => {
        const dataHandler = (latestBlockData: NewBlockData) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            emit(latestBlockData);
        };

        const errorHandler = (error) => {
            // create an Error object and put it into the channel
            emit(new Error(error));
        };

        // setup the subscription
        socket.addListener('blockData', dataHandler);
        socket.on('error', errorHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method

        return () => {
            socket.unsubscribe();
        };
    });
}

export function* unsubscribeToNewBlocksData(subChannel: EventChannel<any>): Saga<void> {
    const [, realtimeUpdate]: [any, RealTimeUpdateAction] = yield race([
        take(UNSUBSCRIBE_TO_NEW_BLOCKS),
        take(SET_REALTIME_UPDATE),
    ]);

    if (realtimeUpdate && realtimeUpdate.realtimeUpdate && !realtimeUpdate.realtimeUpdate.isRealtimeUpdate) {
        subChannel.close();
    } else if (!realtimeUpdate) {
        subChannel.close();
    }
}

export function* subscribeToNewBlocksData(): Saga<void> {
    const api: DataProvider = yield getContext('api');

    const subscription: SubscriptionToNewBlocks = yield call([api, api.subscribeToNewBlocks]);
    const subscriptionChannel: EventChannel<any> = yield call(createSocketChannel, subscription);

    yield fork(unsubscribeToNewBlocksData, subscriptionChannel);

    while (true) {
        try {
            const payload: NewBlockData | Error = yield take(subscriptionChannel);

            if (payload instanceof Error) {
                throw payload;
            }

            yield put(updateLatestBlocksData(payload));
        } catch (err) {
            console.error('socket error:', err);
        }
    }
}

export function* checkIsSubscribeNeeded(): Saga<void> {
    const { isRealtimeUpdate }: {| isRealtimeUpdate: boolean |} = yield select(getRealtimeUpdateDetails());

    if (isRealtimeUpdate) {
        yield put(subscribeToNewBlocks());
    }
}

export default function* watchSubscribeToNewBlocks(): Saga<void> {
    yield takeLeading(SUBSCRIBE_TO_NEW_BLOCKS, subscribeToNewBlocksData);
}