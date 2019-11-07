// @flow

import type { Map } from 'immutable';

import { SET_REALTIME_UPDATE } from './constants';

type Transaction = {
    transactionHash: string,
    from: string,
    to: string,
    value: string,
    gas: number,
    cumulativeGasUsed: number,
    contractAddress: string,
    root: string,
    logsBloom: string,
    status: number,
};

type Block = {
    hash: string,
    index: number,
    stateHash: string,
    transactions: Array<Transaction>,
    round: number,
    createdTime: number,
};

type Node = {|
    node: {|
        payload: Block,
    |},
    cursor: boolean,
|};

export type Action<T, P> = {
    type: T,
    payload?: P
};

export type BlocksState = {
    blockDetails: {
        allBlockData: Array<{}>,
        latestTransactions: Array<{}>,
    }
};

export type BlockAction = Action<'@@INIT', void> | Action<string> & { blocksDetails?: Array<Node> };
export type RealTimeUpdateAction = Action<'@@INIT', void> | Action<SET_REALTIME_UPDATE> & { realtimeUpdate: { isRealtimeUpdate: boolean } }

export type ReduxRootStateType = Map<any, any>;