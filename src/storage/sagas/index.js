// @flow

import {
    fork,
    all,
} from 'redux-saga/effects';

import watchGetLatestBlockData from 'src/storage/sagas/latestBlockData';
import subscribeToNewBlocks from 'src/storage/sagas/subscribeToNewBlocks';

import type { Saga } from 'redux-saga';

export function* rootSaga(): Saga<void> {
    yield all([
        fork(watchGetLatestBlockData),
        fork(subscribeToNewBlocks),
    ]);
}
