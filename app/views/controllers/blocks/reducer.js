import { fromJS } from 'immutable';
import { SET_BLOCK_DATA } from '../constants';

const initialState = fromJS({
  blockDetails: {
    allBlockData: [],
    latestTransactions: [],
  },
});

const defaultState = {
  allBlockData: [],
  latestTransactions: [],
};

function formatBlocksData(state = defaultState, action) {
  console.log('action', action);
  const edges = action;
  const latestTransactions = [];
  const allBlockData = [];

  edges.blocksDetails.forEach((val) => {
    const { hash, index, stateHash, transactions, round } = val.node.payload;
    console.log('val11', val);

    // eslint-disable-next-line no-undef
    console.log('latestTransactions', latestTransactions);
    val.node.payload.transactions.forEach((transac) => {
      console.log('transac66', transac);
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
    console.log('alldata', hash, index, stateHash, transactions, round);
    allBlockData.push({
      hash,
      height: index,
      parentHash: stateHash,
      transactionLength: transactions.length,
      round,
      transactions,
    });
  });
  console.log('allBlockData', allBlockData, latestTransactions);
  return {
    ...state,
    allBlockData,
    latestTransactions,
  };
}

function setBlockDataReducer(state = initialState, action) {
  console.log(' blockData action:  ', action);
  switch (action.type) {
    case SET_BLOCK_DATA:
      const updatedState = formatBlocksData(state, action);
      console.log('updatedState', updatedState);
      return {
        ...updatedState,
      };
    // return state.set('blocksDetails', action.blocksDetails);
    default:
      return state;
  }
}

export default setBlockDataReducer;
