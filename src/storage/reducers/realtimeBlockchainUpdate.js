// @flow

import { fromJS, Map } from 'immutable';
import { SET_REALTIME_UPDATE } from '../constants';

import type { RealTimeUpdateAction } from 'src/storage/types';

const initialState = fromJS({
    realtimeUpdate: {
        isRealtimeUpdate: false,
    },
});

function realtimeUpdateReducer(state = initialState, action: RealTimeUpdateAction) {
    switch (action.type) {
        case SET_REALTIME_UPDATE:
            return state.mergeIn(['realtimeUpdate'], Map(action.realtimeUpdate));
        default:
            return state;
    }
}

export default realtimeUpdateReducer;

export {
    initialState,
};
