// @flow

import { createSelector, createStructuredSelector } from 'reselect';

import type { ReduxRootStateType } from 'src/storage/types';
import type { Map as MapType } from 'immutable';

export const isLoading = (
    state: ReduxRootStateType,
) => state.getIn<boolean>(['latestBlockData', 'isLoading']);

export const latestBlocksSelector = (
    state: ReduxRootStateType,
) => state.getIn<MapType<any, any>>(['latestBlockData', 'blocks']);

const latestBlocksArr = createSelector(
    latestBlocksSelector,
    (latestBlocksArr) => latestBlocksArr.toJS(),
);

export const latestTransactionsSelector = (
    state: ReduxRootStateType,
) => state.getIn<MapType<any, any>>(['latestBlockData', 'transactions']);

const latestTransactionsArr = createSelector(
    latestTransactionsSelector,
    (latestTransactionsArr) => latestTransactionsArr.toJS(),
);

export const getLatestBlocksSelector = createStructuredSelector<
    ReduxRootStateType,
    {||},
    _,
>({
    latestBlocksArr,
    latestTransactionsArr,
    isLoading,
});