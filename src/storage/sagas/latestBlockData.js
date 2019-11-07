// @flow

import {
    all,
    call,
    put,
    takeEvery,
    getContext,
} from 'redux-saga/effects';

import { GET_LATEST_BLOCK_DATA } from 'src/storage/constants';

import type { Saga } from 'redux-saga';

export function* getLatestBlocksData(): Saga<void> {
    yield put<{ type: string }>({ type: 'LATEST_BLOCKS_DATA_LOADING' });


}

export default function* watchGetLatestBlockData(): Saga<void> {
    yield takeEvery(GET_LATEST_BLOCK_DATA, getLatestBlocksData);
}
