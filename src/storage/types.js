// @flow

import type { Map } from 'immutable';

import type {
    Transaction,
    Block,
    LatestBlocksData,
    ExtractReturn,
} from 'src/utils/types';

import {
    setLatestBlocksData,
    updateLatestBlocksData,
    loadingLatestBlocksData,
} from 'src/storage/actions/latestBlocksData';

type Node = {|
    node: {|
        payload: Block<string>,
    |},
    cursor: boolean,
|};

export type Action<T, P = void> = {|
    +type: T,
    +payload?: P,
|};

export type BlocksState = {
    blockDetails: {
        allBlockData: Array<{}>,
        latestTransactions: Array<{}>,
    }
};

export type SetLatestBlocksDataAction = ExtractReturn<typeof setLatestBlocksData>;
export type UpdateLatestBlockDataAction = ExtractReturn<typeof updateLatestBlocksData>;
export type LoadingLatestBlocksDataAction = ExtractReturn<typeof loadingLatestBlocksData>;
// export type SetLatestBlocksDataAction = Action<'SET_LATEST_BLOCKS_DATA', LatestBlocksData>;
// export type UpdateLatestBlockDataAction = Action<'UPDATE_LATEST_BLOCKS_DATA', LatestBlocksData>;
// export type LoadingLatestBlocksDataAction = Action<'LOADING_LATEST_BLOCKS_DATA', boolean>;

export type BlockAction = Action<string> & { blocksDetails?: Array<Node> };
export type RealTimeUpdateAction = Action<string, { realtimeUpdate: { isRealtimeUpdate: boolean } }>

export type ReduxRootStateType = Map<any, any>;