// @flow

import type { Map } from 'immutable';

import type {
    Block,
    ExtractReturn,
} from 'src/utils/types';

import {
    setLatestBlocksData,
    updateLatestBlocksData,
    loadingLatestBlocksData,
    setLatestBlocksError,
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
export type ErrorLatestBlocksDataAction = ExtractReturn<typeof setLatestBlocksError>;

export type BlockAction = Action<string> & { blocksDetails?: Array<Node> };
export type RealTimeUpdateAction = Action<string, { realtimeUpdate: { isRealtimeUpdate: boolean } }>

export type ReduxRootStateType = Map<any, any>;