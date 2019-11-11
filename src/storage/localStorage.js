// @flow

import { fromJS, Map } from 'immutable';

import type { Map as MapType } from 'immutable';
import type { Middleware } from 'redux';

export const loadState = (): MapType<mixed, mixed> => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null || serializedState === undefined) {
            return Map();
        }

        return fromJS(JSON.parse(serializedState));
    } catch (err) {
        return Map();
    }
};

const saveState = (state: MapType<mixed, mixed>) => {
    try {
        const objState = state.filter((_, key) => !['router', 'latestBlockData'].includes(key)).toJS();
        const serializedState = JSON.stringify(objState);

        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const persistMiddleware: Middleware<MapType<mixed, mixed>, any> = (store) => (next) => (action) => {
    next(action);
    saveState(store.getState());
};
