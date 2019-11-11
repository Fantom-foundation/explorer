// @flow

import type { Map } from 'immutable';

import type { Transaction, Block, LatestBlocksData } from 'src/utils/types'

type Node = {|
    node: {|
        payload: Block<string>,
    |},
    cursor: boolean,
|};

export type Action<T, P = void> = {|
    type: T,
    payload?: P,
|};

export type BlocksState = {
    blockDetails: {
        allBlockData: Array<{}>,
        latestTransactions: Array<{}>,
    }
};

export type SetLatestBlocksDataAction = Action<string, LatestBlocksData>;
export type LoadingLatestBlocksDataAction = Action<string, boolean>;
export type BlockAction = Action<string> & { blocksDetails?: Array<Node> };
export type RealTimeUpdateAction = Action<string, { realtimeUpdate: { isRealtimeUpdate: boolean } }>

export type ReduxRootStateType = Map<any, any>;