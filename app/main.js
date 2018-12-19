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
import { getRealtimeUpdateDetails } from './views/controllers/realtime-blockchain-update/selector';
const history = createHistory();
const persistedState = loadState();

const store = configureStore(persistedState, history);
store.subscribe(() => {
  saveState(store.getState());
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.getBlockData = this.getBlockData.bind(this);
    this.state = {
      intervalSet: false,
    };
  }
  componentDidMount() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.props.realtimeUpdate.isRealtimeUpdate) {
      this.interval = setInterval(this.getBlockData, 5000);
    } else {
      this.interval = setInterval(this.getBlockData, 20000);
    }
    this.getBlockData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.realtimeUpdate.isRealtimeUpdate !==
      prevProps.realtimeUpdate.isRealtimeUpdate
    ) {
      if (this.interval) {
        clearInterval(this.interval);
      }

      if (this.props.realtimeUpdate.isRealtimeUpdate) {
        this.interval = setInterval(this.getBlockData, 5000);
      } else {
        this.interval = setInterval(this.getBlockData, 20000);
      }
      // this.setState({
      //   intervalSet: true,
      // });
      // setInterval(this.getBlockData, 4000);
    }
  }

  getBlockData() {
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
              const blockDetails = {
                payload: allData.data.blocks.edges,
              };
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
    const { setBlockData, store } = this.props;
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
  getRealtimeUpdateDetails(),
  (realtimeUpdate) => ({ realtimeUpdate })
);

const mapDispatchToProps = (dispatch) => ({
  setBlocksData: (blockData) => dispatch(setBlockData(blockData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
