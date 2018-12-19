import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const getBlockData = (state) => state.get('setBlockDataReducer');

/**
 * Select the language locale
 */

const getBlockUpdateDetails = () =>
  createSelector(getBlockData, (blockDataUpdateState) => {
    let allBlockData = '';
    let latestTransactions = '';
    if (blockDataUpdateState) {
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
