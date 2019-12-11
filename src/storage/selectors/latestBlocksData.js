// @flow

import { List } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';

import type { StateType, LatestBlocksDataType } from 'src/storage/reducers/latestBlocksData';
import type { ReduxRootStateType } from 'src/storage/types';
import type { Map as MapType } from 'immutable';

export const isLoading = (
    state: MapType<'latestBlockData', StateType>,
): boolean => state.getIn(['latestBlockData', 'isLoading']) || false;

export const latestBlocksSelector = (
    state: ReduxRootStateType,
): $ElementType<LatestBlocksDataType, 'blocks'> => state.getIn(['latestBlockData', 'blocks']) || List();

const latestBlocksArr = createSelector(
    latestBlocksSelector,
    (latestBlocksArr) => latestBlocksArr.toJS(),
);

export const latestTransactionsSelector = (
    state: ReduxRootStateType,
): $ElementType<LatestBlocksDataType, 'transactions'> => state.getIn(['latestBlockData', 'transactions']) || List();

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