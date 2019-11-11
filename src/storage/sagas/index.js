// @flow

import {
    fork,
    all,
    call,
    put,
    takeEvery,
    getContext,
} from 'redux-saga/effects';

import watchGetLatestBlockData from 'src/storage/sagas/latestBlockData';

import { setBlockData } from 'src/storage/actions/blocks';

import type { Saga } from 'redux-saga';

function* incrementAsync() {
    const api = yield getContext('api');
    const data = yield call([api, api.getLatestBlocks]);
    yield put(setBlockData({ payload: data }));
}

function* watchIncrementAsync() {
    yield takeEvery('SET_BLOCK_DATA_ASYNC', incrementAsync);
}

export function* rootSaga(): Saga<void> {
    yield all([
        fork(watchIncrementAsync),
        fork(watchGetLatestBlockData),
    ]);
}
