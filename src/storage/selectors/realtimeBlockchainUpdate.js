// @flow

import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectRealtimeUpdateDetails = (state) =>
  state.get('realtimeUpdateReducer');

/**
 * Select the language locale
 */

const getRealtimeUpdateDetails = () =>
  createSelector(selectRealtimeUpdateDetails, (realtimeUpdateState) => {
    const realtimeUpdate = realtimeUpdateState.get('realtimeUpdate');
    let isRealtimeUpdate = '';
    if (realtimeUpdate) {
      isRealtimeUpdate = realtimeUpdate.isRealtimeUpdate;
    }
    if (isRealtimeUpdate === undefined) {
      isRealtimeUpdate = realtimeUpdate.get('isRealtimeUpdate');
    }

    return { isRealtimeUpdate };
  });

export { selectRealtimeUpdateDetails, getRealtimeUpdateDetails };
