// @flow

import realtimeUpdateReducer, {
    initialState as realtimeUpdateReducerInitialState,
} from 'src/storage/reducers/realtimeBlockchainUpdate';
import latestBlockData, {
    initialState as latestBlockDataInitialState,
} from 'src/storage/reducers/latestBlocksData';

import {
    SET_REALTIME_UPDATE,
    SET_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

describe('Redux reducers: realtimeBlockchainUpdate', function realtimeBlockchainUpdateReducer() {
    let defaultState;

    beforeEach(() => {
        defaultState = realtimeUpdateReducer(undefined, { type: '@@INIT' });
    });

    it('should return correct default state', function () {
        expect(defaultState).toBe(realtimeUpdateReducerInitialState);
    });

    it('should return correct new state', function () {
        const actionData = {
            type: SET_REALTIME_UPDATE,
            realtimeUpdate: { isRealtimeUpdate: true },
        };

        expect(defaultState.getIn(['realtimeUpdate', 'isRealtimeUpdate'])).toBe(false);

        const newState = realtimeUpdateReducer(defaultState, actionData);

        expect(newState.getIn(['realtimeUpdate', 'isRealtimeUpdate'])).toBe(true);
    });
});

describe('Redux reducers: latestBlocksData', function latestBlocksDataReducer() {
    let defaultState;

    const mockBlock = {
        difficulty: '2',
        extraData: '0xstring',
        gasLimit: 10000,
        gasUsed: 1000,
        hash: '0xstring',
        logsBloom: 'string',
        miner: '0xstring',
        nonce: 100,
        number: 100,
        parentHash: '0xstring',
        sha3Uncles: '0xstring',
        size: 100,
        stateRoot: '0xstring',
        timestamp: 1500000,
        totalDifficulty: '0xstring',
        transactions: 0,
        transactionsRoot: '0xstring',
        uncles: [],
    };

    beforeEach(() => {
        defaultState = latestBlockData(undefined, { type: '@@INIT' });
    });

    it('should return correct default state', function () {
        expect(defaultState).toBe(latestBlockDataInitialState);
    });

    it('should return correct new state', function () {
        const actionData = {
            type: SET_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [{ ...mockBlock, hash: 'string' }],
            },
        };

        expect(defaultState.getIn(['blocks', 0])).toBeUndefined();

        let newState = latestBlockData(defaultState, actionData);
        expect(newState.getIn(['blocks', 0, 'hash'])).toBe('string');

        const prevTransactions = defaultState.getIn(['transactions']);
        expect(newState.getIn(['transactions'])).toBe(prevTransactions);
    });

    it('should skip repeat blocks', function () {
        const actionData = {
            type: SET_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [
                    { ...mockBlock, hash: 'string1', number: 1 },
                    { ...mockBlock, hash: 'string2', number: 2 },
                ],
            },
        };

        const newData = {
            type: UPDATE_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [{ ...mockBlock, hash: 'string3', number: 3 }],
            },
        };

        let newState = latestBlockData(defaultState, actionData);
        expect(newState.getIn(['blocks', 0, 'hash'])).toBe('string1');

        newState = latestBlockData(newState, newData);
        expect(newState.getIn(['blocks', 0, 'hash'])).toBe('string3');

        newState = latestBlockData(newState, newData);
        expect(newState.get('blocks').size).toBe(3);
    });
});