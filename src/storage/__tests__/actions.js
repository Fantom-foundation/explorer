// @flow

import { setBlockData } from 'src/storage/actions/blocks';
import { setRealtimeUpdateDetails } from 'src/storage/actions/realtimeBlockchainUpdate';
import { setUserDetails } from 'src/storage/actions/userDetails';
import { setLatestBlocksData } from 'src/storage/actions/latestBlocksData';

import {
    SET_BLOCK_DATA,
    SET_REALTIME_UPDATE,
    SET_USER_DETAILS,
    SET_LATEST_BLOCK_DATA,
} from 'src/storage/constants';

describe('Redux actions: blocks', function blocksActions() {
    it('should return correct setBlockData object', function () {
        const dataMock = { payload: 'some data' };
        const setDataAction = setBlockData(dataMock);

        expect(setDataAction).toEqual({
            type: SET_BLOCK_DATA,
            blocksDetails: dataMock.payload,
        });
    });
});

describe('Redux actions: realtimeBlockchainUpdate', function rbuActions() {
    it('should return correct setRealtimeUpdateDetails object', function () {
        const dataMock = { isRealtimeUpdate: true };
        const setRudAction = setRealtimeUpdateDetails(dataMock);

        expect(setRudAction).toEqual({
            type: SET_REALTIME_UPDATE,
            realtimeUpdate: dataMock,
        });
    });
});

describe('Redux actions: userDetails', function userDetails() {
    it('should return correct setUserDetails object', function () {
        const dataMock = { id: 'id', email: 'email@example.org' };
        const setUserDetailsAction = setUserDetails(dataMock);

        expect(setUserDetailsAction).toEqual({
            type: SET_USER_DETAILS,
            userDetails: { ...dataMock },
        });
    });
});

describe('Redux actions: latestBlocksData', function latestBlocksData() {
    it('should return correct setLatestBlocksData object', function () {
        const dataMock = { blocks: [{ hash: 'hash' }] };
        const setLatestBlocksDataAction = setLatestBlocksData(dataMock);

        expect(setLatestBlocksDataAction).toEqual({
            type: SET_LATEST_BLOCK_DATA,
            payload: dataMock,
        });
    });
});




