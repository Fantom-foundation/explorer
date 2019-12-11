// @flow

import type { Map } from 'immutable';

import type {
    ExtractReturn,
} from 'src/utils/types';

import {
    setLatestBlocksData,
    updateLatestBlocksData,
    loadingLatestBlocksData,
    setLatestBlocksError,
} from 'src/storage/actions/latestBlocksData';

import {
    setRealtimeUpdateDetails,
} from 'src/storage/actions/realtimeBlockchainUpdate';

export type IntiAction = { type: '@@INIT' };
export type SetLatestBlocksDataAction = ExtractReturn<typeof setLatestBlocksData>;
export type UpdateLatestBlockDataAction = ExtractReturn<typeof updateLatestBlocksData>;
export type LoadingLatestBlocksDataAction = ExtractReturn<typeof loadingLatestBlocksData>;
export type ErrorLatestBlocksDataAction = ExtractReturn<typeof setLatestBlocksError>;

export type RealTimeUpdateAction = ExtractReturn<typeof setRealtimeUpdateDetails>;

export type ReduxRootStateType = Map<any, any>;