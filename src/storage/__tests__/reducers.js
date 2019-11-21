// @flow

import realtimeUpdateReducer, { initialState as realtimeUpdateReducerInitialState } from 'src/storage/reducers/realtimeBlockchainUpdate';
import latestBlockData, { initialState as latestBlockDataInitialState } from 'src/storage/reducers/latestBlocksData';

import {
    SET_REALTIME_UPDATE,
    SET_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

describe('Redux reducers: realtimeBlockchainUpdate', function realtimeBlockchainUpdateReducer() {
    it('should return correct default state', function () {
        const defaultState = realtimeUpdateReducer(undefined, { type: '@@INIT' });

        expect(defaultState).toBe(realtimeUpdateReducerInitialState);
    });

    it('should return correct new state', function () {
        const actionData = {
            type: SET_REALTIME_UPDATE,
            realtimeUpdate: { isRealtimeUpdate: true },
        };
        const prevState = realtimeUpdateReducer(undefined, { type: '@@INIT' });

        expect(prevState.getIn(['realtimeUpdate', 'isRealtimeUpdate'])).toBe(false);

        const newState = realtimeUpdateReducer(prevState, actionData);

        expect(newState.getIn(['realtimeUpdate', 'isRealtimeUpdate'])).toBe(true);
    });
});

describe('Redux reducers: latestBlocksData', function latestBlocksDataReducer() {
    let defaultState;

    beforeEach(() => {
        defaultState = latestBlockData(undefined, { type: '@@INIT' });
    });

    it('should return correct default state', function () {
        const defaultState = latestBlockData(undefined, { type: '@@INIT' });
        expect(defaultState).toBe(latestBlockDataInitialState);
    });

    it('should return correct new state', function () {
        const actionData = {
            type: SET_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [{ hash: 'string' }],
            },
        };

        expect(defaultState.getIn(['blocks', '0'])).toBeUndefined();

        let newState = latestBlockData(defaultState, actionData);
        expect(newState.getIn(['blocks', '0', 'hash'])).toBe('string');

        const prevTransactions = defaultState.getIn(['transactions']);
        expect(newState.getIn(['transactions'])).toBe(prevTransactions);
    });

    it('should skip repeat blocks', function () {
        const actionData = {
            type: SET_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [
                    { hash: 'string1', number: 1 },
                    { hash: 'string2', number: 2 },
                ],
            },
        };

        const newData = {
            type: UPDATE_LATEST_BLOCKS_DATA,
            payload: {
                blocks: [{ hash: 'string3', number: 3 }],
            },
        };

        let newState = latestBlockData(defaultState, actionData);
        expect(newState.getIn(['blocks', '0', 'hash'])).toBe('string1');

        newState = latestBlockData(newState, newData);
        expect(newState.getIn(['blocks', '0', 'hash'])).toBe('string3');

        newState = latestBlockData(newState, newData);
        expect(newState.get('blocks').size).toBe(3);
    });
});