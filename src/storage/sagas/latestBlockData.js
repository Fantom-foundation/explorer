// @flow

import {
    fork,
    call,
    put,
    takeEvery,
    getContext,
} from 'redux-saga/effects';

import {
    GET_LATEST_BLOCKS_DATA,
    SET_REALTIME_UPDATE,
} from 'src/storage/constants';

import {
    setLatestBlocksData,
    loadingLatestBlocksData
} from 'src/storage/actions/latestBlocksData';

import { checkIsSubscribeNeeded } from 'src/storage/sagas/subscribeToNewBlocks';

import type { Saga } from 'redux-saga';

export function* getLatestBlocksData(): Saga<void> {
    yield put(loadingLatestBlocksData(true));

    const api = yield getContext('api');
    const data = yield call([api, api.getLatestBlocksData]);

    // subscribe to new blocks if it is needed
    yield fork(checkIsSubscribeNeeded);

    yield put(setLatestBlocksData(data));
    yield put(loadingLatestBlocksData(false));
}

export default function* watchGetLatestBlockData(): Saga<void> {
    yield takeEvery([GET_LATEST_BLOCKS_DATA, SET_REALTIME_UPDATE], getLatestBlocksData);
}
