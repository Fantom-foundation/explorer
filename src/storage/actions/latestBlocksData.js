// @flow

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
    GET_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type {
    LatestBlocksDataType,
} from 'src/storage/types';

export function setLatestBlocksData(data: LatestBlocksDataType) {
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
