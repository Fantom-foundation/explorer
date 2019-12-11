// @flow

import { Record, Map, type RecordOf } from 'immutable';
import { SET_REALTIME_UPDATE } from '../constants';

import type { RealTimeUpdateAction, IntiAction } from 'src/storage/types';

type RealtimeUpdateType = {
    realtimeUpdate: {
        isRealtimeUpdate: boolean,
    },
};

type RealtimeUpdateReducerAction =
    | RealTimeUpdateAction
    | IntiAction;

type StateType = RecordOf<RealtimeUpdateType>;

const RealtimeUpdateRecord = Record({
    realtimeUpdate: {
        isRealtimeUpdate: false,
    }
}, 'RealtimeUpdate');

const initialState = RealtimeUpdateRecord<RealtimeUpdateType>();

function realtimeUpdateReducer(state: StateType = initialState, action: RealtimeUpdateReducerAction): StateType {
    switch (action.type) {
        case SET_REALTIME_UPDATE:
            return state.mergeIn(['realtimeUpdate'], action.realtimeUpdate);
        default:
            return state;
    }
}

export default realtimeUpdateReducer;

export {
    initialState,
    RealtimeUpdateRecord,
};

export type {
    StateType,
    RealtimeUpdateType,
};
