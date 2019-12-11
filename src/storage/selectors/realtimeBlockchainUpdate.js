// @flow

import { createSelector } from 'reselect';

import type { Map } from 'immutable';
import type { StateType as ReducerStateType } from 'src/storage/reducers/realtimeBlockchainUpdate';

/**
 * Direct selector to the languageToggle state domain
 */
const selectRealtimeUpdateDetails = (state: Map<'realtimeUpdateReducer', ReducerStateType>) =>
    state.get('realtimeUpdateReducer');

/**
 * Select the language locale
 */

const getRealtimeUpdateDetails = () =>
    createSelector<
        Map<'realtimeUpdateReducer', ReducerStateType>,
        {||},
        {| isRealtimeUpdate: boolean |},
        _
    >(selectRealtimeUpdateDetails, (realtimeUpdateState) => {
        let isRealtimeUpdate = false;

        if (realtimeUpdateState) {
            isRealtimeUpdate = realtimeUpdateState.getIn(['realtimeUpdate', 'isRealtimeUpdate']) || false;
        }

        return { isRealtimeUpdate };
  });

export { selectRealtimeUpdateDetails, getRealtimeUpdateDetails };
