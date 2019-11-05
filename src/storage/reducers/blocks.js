// @flow

import { fromJS } from 'immutable';
import _uniqBy from 'lodash/uniqBy';

import { SET_BLOCK_DATA } from '../constants';

import type { BlocksState, BlockAction } from '../types.js';

const initialState = fromJS({
    blockDetails: {
        allBlockData: [{
            hash: 0xd653ebade48c62391f6852de7b49fdfe28a15eda28c48bafb45b26def596a167,
            height: 8877020,
            round: 0,
            transactionLength: 180,
            createdTime: Date.now(),
        }],
        latestTransactions: [],
    },
});

const defaultState = {
    blockDetails: {
        allBlockData: [],
        latestTransactions: [],
    },
};

// TODO: refactor all this
export function formatBlocksData(state: BlocksState = defaultState, action: BlockAction): BlocksState {
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

        transactions.forEach((tx) => {
            latestTransactions.push({
                block_id: val.node.payload.hash,
                address_from: tx.from,
                transaction_hash: tx.transactionHash,
                address_to: tx.to,
                value: tx.value,
                gasUsed: tx.gas,
                cumulativeGasUsed: tx.cumulativeGasUsed,
                contractAddress: tx.contractAddress,
                root: tx.root,
                logsBloom: tx.logsBloom,
                status: tx.status,
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

function setBlockDataReducer(state: BlocksState = initialState, action: BlockAction) {
    switch (action.type) {
        case SET_BLOCK_DATA:
            console.log(action);
        // const updatedState = formatBlocksData(state, action);
        // return {
        //   ...updatedState,
        // };
            return state;
        default:
            return state;
    }
}

export default setBlockDataReducer;
