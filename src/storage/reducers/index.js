// @flow

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import userDetailsReducer from 'src/storage/reducers/userDetails';
import realtimeUpdateReducer from 'src/storage/reducers/realtimeBlockchainUpdate';
import setBlockDataReducer from 'src/storage/reducers/blocks';
import languageProviderReducer from 'src/views/containers/LanguageProvider/reducer';

import type { BrowserHistory } from 'history';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(history: BrowserHistory, injectedReducers: {} = {}) {
    return combineReducers({
        router: connectRouter(history),
        language: languageProviderReducer,
        currentUserDetails: userDetailsReducer,
        realtimeUpdateReducer,
        setBlockDataReducer,
        ...injectedReducers,
    });
}
