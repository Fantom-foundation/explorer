// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router/immutable';

import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import { loadState, persistMiddleware } from './localStorage';

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();

export const history = createBrowserHistory();

export default function configureStore() {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
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
                // Prevent recomputing reducers for `replaceReducer`
                shouldHotReload: false,
            })
            : compose;

    /* eslint-enable */
    const rootReducer = createReducer(history);

    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(...enhancers),
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
