import { fromJS } from 'immutable';
import { SET_BLOCK_DATA } from '../constants';
import _uniqBy from 'lodash/uniqBy';

const initialState = fromJS({
  blockDetails: {
    allBlockData: [],
    latestTransactions: [],
  },
});

const defaultState = {
  blockDetails: {
    allBlockData: [],
    latestTransactions: [],
  },
};

function formatBlocksData(state = defaultState, action) {
  const edges = action;
  const latestTransactions = [];
  const allBlockData = [];

  edges.blocksDetails.forEach((val) => {
    const {
      hash,
      index,
      stateHash,
      transactions,
      round,
      createdTime,
    } = val.node.payload;

    // eslint-disable-next-line no-undef
    val.node.payload.transactions.forEach((transac) => {
      latestTransactions.push({
        block_id: val.node.payload.hash,
        address_from: transac.from,
        transaction_hash: transac.transactionHash,
        address_to: transac.to,
        value: transac.value,
        gasUsed: transac.gas,
        cumulativeGasUsed: transac.cumulativeGasUsed,
        contractAddress: transac.contractAddress,
        root: transac.root,
        logsBloom: transac.logsBloom,
        status: transac.status,
      });
    });
    allBlockData.push({
      hash,
      height: index,
      parentHash: stateHash,
      transactionLength: transactions.length,
      round,
      transactions,
      cursor: val.cursor,
      createdTime,
    });
  });
  if (state && state.allBlockData) {
    let newAllBlockData = [...state.allBlockData].concat(allBlockData);
    let newAllTransactions = [...state.latestTransactions].concat(
      latestTransactions
    );
    newAllBlockData = _uniqBy(newAllBlockData, (e) => e.hash);
    newAllTransactions = _uniqBy(newAllTransactions, (e) => e.transaction_hash);
    newAllBlockData.sort((a, b) => b.height - a.height);
    return {
      ...state,
      allBlockData: newAllBlockData,
      latestTransactions: newAllTransactions,
    };
  }

  return {
    ...state,
    allBlockData,
    latestTransactions,
  };
}

function setBlockDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BLOCK_DATA:
      const updatedState = formatBlocksData(state, action);
      return {
        ...updatedState,
      };
    default:
      return state;
  }
}

export default setBlockDataReducer;
