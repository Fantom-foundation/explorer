// @flow

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
    GET_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
    SUBSCRIBE_TO_NEW_BLOCKS,
    UNSUBSCRIBE_TO_NEW_BLOCKS,
    ERROR_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type {
    LatestBlocksData,
    RequestError,
    NewBlockData,
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

export function updateLatestBlocksData(data: NewBlockData) {
    return {
        type: UPDATE_LATEST_BLOCKS_DATA,
        payload: data,
    }
}

export function subscribeToNewBlocks() {
    return {
        type: SUBSCRIBE_TO_NEW_BLOCKS,
    };
}

export function unsubscribeToNewBlocks() {
    return {
        type: UNSUBSCRIBE_TO_NEW_BLOCKS,
    };
}

export function setLatestBlocksError(error: RequestError) {
    return {
        type: ERROR_LATEST_BLOCKS_DATA,
        payload: error,
    };
}
