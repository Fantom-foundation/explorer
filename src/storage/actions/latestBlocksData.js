// @flow

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
    GET_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type {
    LatestBlocksData,
    Block,
} from 'src/utils/types';

export function setLatestBlocksData(data: LatestBlocksData) {
    return {
        type: SET_LATEST_BLOCKS_DATA,
        payload: data,
    };
}

export function loadingLatestBlocksData(isLoading: boolean) {
    return {
        type: LOADING_LATEST_BLOCKS_DATA,
        payload: isLoading,
    };
}

export function getLatestBlocksData() {
    return {
        type: GET_LATEST_BLOCKS_DATA,
    }
}

export function updateLatestBlocksData(data: Block<string>) {
    return {
        type: UPDATE_LATEST_BLOCKS_DATA,
        payload: data,
    }
}
