// @flow

/**
 * Combine all reducers.js in this file and export the combined reducers.js.
 */

import { combineReducers } from 'redux-immutable';

// import userDetailsReducer from 'src/storage/reducers/userDetails';
// import languageProviderReducer from 'src/views/containers/LanguageProvider/reducer';
import realtimeUpdateReducer from 'src/storage/reducers/realtimeBlockchainUpdate';
import latestBlockData from 'src/storage/reducers/latestBlocksData';

import type { Map } from 'immutable';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer<V, S: ?Map<$Keys<V>, $Values<V>>, A>(
    injectedReducers: {...} = {},
): (state: S, action: A) => S {
    const rootReducers = {
        ...injectedReducers,
        // language: languageProviderReducer,
        // currentUserDetails: userDetailsReducer,
        realtimeUpdateReducer,
        latestBlockData,
    };

    return combineReducers(rootReducers);
}
