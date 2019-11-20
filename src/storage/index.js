// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import type { Map } from 'immutable';

import createReducer from './reducers';
import { loadState, persistMiddleware } from './localStorage';
import { rootSaga } from 'src/storage/sagas';
import ApiProvider from 'src/utils/DataProvider';

const api = new ApiProvider('web3');

const sagaMiddleware = createSagaMiddleware({
    context: {
        api,
    },
});
const persistedState = loadState();

export default function configureStore() {
    const middlewares = [
        sagaMiddleware,
        persistMiddleware,
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
                // Prevent recomputing reducers.js for `replaceReducer`
                shouldHotReload: false,
            })
            : compose;

    /* eslint-enable */
    const rootReducer = createReducer();

    const store = {
        ...createStore<Map<mixed, mixed>, mixed, any>( // TODO: correct flow store types
            rootReducer,
            persistedState,
            composeEnhancers(...enhancers),
        ),
        // Extensions
        runSaga: sagaMiddleware.run,
        injectedReducers: {},
        injectedSagas: {},
    };

    store.runSaga(rootSaga);

    // Make reducers.js hot reloadable, see http://mxs.is/googmo

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
