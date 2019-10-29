// @flow

import { fromJS } from 'immutable';

import type { Map } from 'immutable';
import type { Middleware } from 'redux';

export const loadState = (): ?mixed => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null || serializedState === undefined) {
            return undefined;
        }

        return fromJS(JSON.parse(serializedState));
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: Map<mixed, mixed>) => {
    try {
        const objState = state.filter((_, key) => !['router'].includes(key)).toJS();
        const serializedState = JSON.stringify(objState);

        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const persistMiddleware: Middleware<Map<mixed, mixed>, any> = (store) => (next) => (action) => {
    next(action);
    saveState(store.getState());
};
