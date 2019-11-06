// @flow

import { createSelector } from 'reselect';
import { Map } from 'immutable';

import type { Map as MapType } from 'immutable';

import type { ReduxRootStateType } from 'src/storage/types';

/**
 * Select the language locale
 */

const getBlockData = (state: ReduxRootStateType): MapType<any, any> => state.get('setBlockDataReducer');

/**
 * Direct selector to the languageToggle state domain
 */

const getBlockUpdateDetails = () =>
    createSelector<
        ReduxRootStateType,
        null,
        { allBlockData: MapType<any, any>, latestTransactions: MapType<any, any> },
        MapType<string, MapType<any, any>>,
    >(getBlockData, (blockDataUpdateState) => {
        let allBlockData = undefined;
        let latestTransactions = undefined;

        if (!Map.isMap(blockDataUpdateState)) {
            allBlockData = blockDataUpdateState.allBlockData;
            latestTransactions = blockDataUpdateState.latestTransactions;
        }

        if (allBlockData === undefined) {
            allBlockData = blockDataUpdateState.get('allBlockData');
        }

        if (latestTransactions === undefined) {
            latestTransactions = blockDataUpdateState.get('latestTransactions');
        }

        return { allBlockData, latestTransactions };
    });

export { getBlockData, getBlockUpdateDetails };
