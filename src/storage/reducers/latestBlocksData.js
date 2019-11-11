// @flow

import { fromJS } from 'immutable';

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type { Map as MapType } from 'immutable';
import type {
    SetLatestBlocksDataAction,
    LoadingLatestBlocksDataAction,
} from 'src/storage/types';

type latestBlocksDataType = MapType<string, MapType<number, any> | boolean>;
type blocksDataAction =
    | LoadingLatestBlocksDataAction
    | SetLatestBlocksDataAction;

export const initialState = fromJS({
    isLoading: false,
    blocks: [],
    transactions: [],
});

function latestBlockData(state: latestBlocksDataType = initialState, action: blocksDataAction): latestBlocksDataType {
    const { type, payload } = action;

    switch (type) {
        case SET_LATEST_BLOCKS_DATA: {
            const payloadMap = fromJS(payload);
            return state.merge(payloadMap);
        }

        case LOADING_LATEST_BLOCKS_DATA: {
            return state.set('isLoading', typeof payload === 'boolean' && payload);
        }

        default: {
            return state;
        }
    }
}

export default latestBlockData;
