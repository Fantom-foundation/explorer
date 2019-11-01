// @flow

import realtimeUpdateReducer, { initialState } from 'src/storage/reducers/realtimeBlockchainUpdate';
import { SET_REALTIME_UPDATE } from 'src/storage/constants';

describe('Redux reducers: realtimeBlockchainUpdate', function realtimeBlockchainUpdateReducer() {
    it('should return correct default state', function () {
        const defaultState = realtimeUpdateReducer(undefined, { type: '@@INIT' });

        expect(defaultState).toBe(initialState);
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