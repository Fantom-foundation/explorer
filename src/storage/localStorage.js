// @flow

import { Map } from 'immutable';

import { RealtimeUpdateRecord } from 'src/storage/reducers/realtimeBlockchainUpdate';

import type { Map as MapType } from 'immutable';
import type { Middleware } from 'redux';
import type { RealtimeUpdateType } from 'src/storage/reducers/realtimeBlockchainUpdate';

type deSerializedStateType = {
    realtimeUpdateReducer: RealtimeUpdateType,
};

type rehydrateState = MapType<$Keys<deSerializedStateType>, $Values<deSerializedStateType>>;

const immutableConverters = {
    realtimeUpdateReducer: RealtimeUpdateRecord,
};

export const loadState = (): rehydrateState => {
    let result = Map();

    try {
        const serializedState = localStorage.getItem('state');

        if (!serializedState) {
            return result;
        }

        const deSerializedState: deSerializedStateType = JSON.parse(serializedState);

        result = result.withMutations((mutable) => {
            for (let key in immutableConverters) {
                mutable.set(key, immutableConverters[key](deSerializedState[key]))
            }

            return mutable;
        });

        return result;
    } catch (err) {
        return result;
    }
};

const saveState = (state?: MapType<mixed, mixed>): void => {
    try {
        if (!state) {
            return;
        }

        const objState = state.filter((_, key) => !['router', 'latestBlockData'].includes(key)).toJS();
        const serializedState = JSON.stringify(objState);

        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const persistMiddleware: Middleware<MapType<any, any> | void, any> = (api) => (next) => (action) => {
    next(action);

    saveState(api.getState());
};
