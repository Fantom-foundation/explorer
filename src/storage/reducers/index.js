// @flow

/**
 * Combine all reducers.js in this file and export the combined reducers.js.
 */

import { combineReducers } from 'redux-immutable';

import userDetailsReducer from 'src/storage/reducers/userDetails';
import realtimeUpdateReducer from 'src/storage/reducers/realtimeBlockchainUpdate';
import setBlockDataReducer from 'src/storage/reducers/blocks';
import languageProviderReducer from 'src/views/containers/LanguageProvider/reducer';
import latestBlockData from 'src/storage/reducers/latestBlocksData';

import type { Map } from 'immutable';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: {} = {}): Map<any, any> { // TODO: set correct Redux State types
    return combineReducers({
        language: languageProviderReducer,
        currentUserDetails: userDetailsReducer,
        realtimeUpdateReducer,
        setBlockDataReducer,
        latestBlockData,
        ...injectedReducers,
    });
}
