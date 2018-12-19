import React, { Component } from 'react';
import Routes from 'routes';
import { createSelector } from 'reselect';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import HttpDataProvider from './utils/httpProvider';
import { loadState, saveState } from './localStorage';

import { setBlockData } from './views/controllers/blocks/action';
import { getBlockUpdateDetails } from './views/controllers/blocks/selector';
const history = createHistory();
const persistedState = loadState();

const store = configureStore(persistedState, history);
store.subscribe(() => {
  saveState(store.getState());
});

class Main extends React.Component {
  componentDidMount() {
    const { setBlocksData } = this.props;
    const initialValue = 30;
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
      {
        blocks(first: ${initialValue}, by: "index", byDirection: "desc") {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor,
            node {
              id,
              payload
            }
          }
        }
      }`,
    })
      .then(
        (res) => {
          if (res && res.data) {
            const allData = res.data;
            if (
              allData.data &&
              allData.data.blocks &&
              allData.data.blocks.edges &&
              allData.data.blocks.edges.length
            ) {
              const edges = allData.data.blocks.edges;
              let cursor;
              const latestTransactions = [];
              const allBlockData = [];

              edges.forEach((val) => {
                const {
                  hash,
                  index,
                  stateHash,
                  transactions,
                  round,
                } = val.node.payload;

                latestTransactions.push(...val.node.payload.transactions);
                cursor = val.cursor;
                allBlockData.push({
                  hash,
                  height: index,
                  parentHash: stateHash,
                  transactionLength: transactions.length,
                  round,
                  transactions,
                });
              });
              const blockDetails = {
                payload: allData.data.blocks.edges,
              };
              console.log('blockDetails5', blockDetails);
              setBlocksData(blockDetails);
            } else {
              console.log('else part');
            }
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(() => {
        console.log('error');
      });
  }
  render() {
    const { blockDetails, setBlockData, store } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
Main.propTypes = {
  setBlockData: PropTypes.func,
};
const mapStateToProps = createSelector(
  getBlockUpdateDetails(),
  (blockDetails) => ({ blockDetails })
);

const mapDispatchToProps = (dispatch) => ({
  setBlocksData: (blockData) => dispatch(setBlockData(blockData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
