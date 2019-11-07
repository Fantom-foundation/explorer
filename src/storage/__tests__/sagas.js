// @flow

import {
    put,
} from 'redux-saga/effects'

import { getLatestBlocksData } from 'src/storage/sagas/latestBlockData';

describe('Redux saga: latestBlocksData', function getLatestBlocksSaga() {
    it('should return correct data', function () {
        const gen = getLatestBlocksData();

        expect(gen.next().value).toEqual(put({ type: 'LATEST_BLOCKS_DATA_LOADING' }));
    });
});