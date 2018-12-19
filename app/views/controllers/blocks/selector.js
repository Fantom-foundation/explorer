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
    console.log('blockDataUpdateState', blockDataUpdateState);
    // const getAllBlockData = blockDataUpdateState.get('allBlockData');
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

    console.log('blockData123', allBlockData);
    console.log('latestTransactions123', latestTransactions);

    return { allBlockData, latestTransactions };
  });

export { getBlockData, getBlockUpdateDetails };
