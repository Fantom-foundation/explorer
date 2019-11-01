// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';

import configureStore, { history } from 'src/storage';

// import { translationMessages } from './i18n';
import Main from './main';

import './global-style';

const MOUNT_NODE = document.getElementById('root');
const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>
);

if (MOUNT_NODE) {
    ReactDOM.render(<Root />, MOUNT_NODE);
} else {
    console.log('Element with id "root" not found.');
}

// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'routes'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }
//
// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise((resolve) => {
//     resolve(import('intl'));
//   })
//     .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }
//
// // Install ServiceWorker and AppCache in the end since
// // it's not most important operation and if main code fails,
// // we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
