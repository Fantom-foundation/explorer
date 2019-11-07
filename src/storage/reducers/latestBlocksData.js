// @flow

import { fromJS } from 'immutable';

import { SET_LATEST_BLOCK_DATA } from 'src/storage/constants';

import type { Map as MapType } from 'immutable';
import type { Action } from 'src/storage/types';

type latestBlocksDataType = MapType<string, MapType<number, any>>;
type latestBlocksDataAction = Action<
    string,
    { blocks?: Array<any>, transactions?: Array<any> }
>;

export const initialState = fromJS({
    blocks: [],
    transactions: [],
});

function latestBlockData(state: latestBlocksDataType = initialState, action: latestBlocksDataAction) {
    const { type, payload } = action;

    switch (type) {
        case SET_LATEST_BLOCK_DATA: {
            const payloadMap = fromJS(payload);
            const newState: latestBlocksDataType = state.mergeDeep(payloadMap);
            return newState;
        }

        default: {
            return state;
        }
    }
}

export default latestBlockData;
