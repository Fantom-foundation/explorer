// @flow

import { Map, List, fromJS } from 'immutable';

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
    ERROR_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type {
    Map as MapType,
    List as ListType,
} from 'immutable';
import type {
    LoadingLatestBlocksDataAction,
    SetLatestBlocksDataAction,
    UpdateLatestBlockDataAction,
    ErrorLatestBlocksDataAction,
} from 'src/storage/types';

type latestBlocksDataType = MapType<string, ListType<MapType<any>> | boolean | string>;
type blocksDataAction =
    | LoadingLatestBlocksDataAction
    | SetLatestBlocksDataAction
    | UpdateLatestBlockDataAction
    | ErrorLatestBlocksDataAction;

export const initialState = Map({
    isLoading: false,
    blocks: List([]),
    transactions: List([]),
    error: null,
});

function latestBlockData(state: latestBlocksDataType = initialState, action: blocksDataAction): latestBlocksDataType {
    switch (action.type) {
        case SET_LATEST_BLOCKS_DATA: {
            const payloadMap = fromJS(action.payload);

            return state.withMutations((mutate) => {
                mutate.set('blocks', payloadMap.get('blocks'));

                if (payloadMap.has('transactions')) {
                    mutate.set('transactions', payloadMap.get('transactions'));
                }

                return mutate;
            });
        }

        case ERROR_LATEST_BLOCKS_DATA: {
            const {
                error: { message },
            } = action.payload;
            return state.set('error', message);
        }

        case LOADING_LATEST_BLOCKS_DATA: {
            return state.set('isLoading', action.payload);
        }

        case UPDATE_LATEST_BLOCKS_DATA: {
            const { blocks: [block] = [], transactions } = action.payload;

            const newBlock = fromJS(block);
            const newTransactions = List(transactions);

            const newState = state.withMutations(
                (mutable) => {
                    if (mutable.get('blocks').findEntry((value) => value.get('number') === block.number)) {
                        return state;
                    }

                    return mutable
                        .update('blocks', (blocks) => {
                            return blocks.unshift(newBlock)
                                .sort((a, b) => a.number - b.number)
                                .slice(0, 10)
                        })
                        .update('transactions', (transactions) => {
                            return newTransactions.concat(transactions)
                                .slice(0, 10);
                        });
                },
            );

            return newState;
        }

        default: {
            return state;
        }
    }
}

export default latestBlockData;
