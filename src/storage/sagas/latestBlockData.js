// @flow

import {
    fork,
    call,
    put,
    takeEvery,
    getContext,
    select,
    take,
} from 'redux-saga/effects';

import {
    GET_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import {
    setLatestBlocksData,
    loadingLatestBlocksData
} from 'src/storage/actions/latestBlocksData';

import {
    getRealtimeUpdateDetails,
} from 'src/storage/selectors/realtimeBlockchainUpdate';

import type { Saga } from 'redux-saga';

import type {
    SetLatestBlocksDataAction,
    LoadingLatestBlocksDataAction,
} from 'src/storage/types';

function* subscribeToNewBlocksData(): Saga<void> {
    const api = yield getContext('api');

    const subscription = yield call([api, api.subscribeToNewBlocks]);

    console.log(subscription);

    yield take('UNSUBSCRIBE_FROM_NEW_BLOCKS_DATA');
}

export function* getLatestBlocksData(): Saga<void> {
    yield put<LoadingLatestBlocksDataAction>(loadingLatestBlocksData(true));

    const { isRealtimeUpdate } = yield select(getRealtimeUpdateDetails());

    if (isRealtimeUpdate) {
        yield fork(subscribeToNewBlocksData);
    }

    const api = yield getContext('api');

    const data = yield call([api, api.getLatestBlocksData]);

    yield put<SetLatestBlocksDataAction>(setLatestBlocksData(data));

    yield  put<LoadingLatestBlocksDataAction>(loadingLatestBlocksData(false));
}

export default function* watchGetLatestBlockData(): Saga<void> {
    yield takeEvery(GET_LATEST_BLOCKS_DATA, getLatestBlocksData);
}
