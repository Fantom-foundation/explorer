// @flow

import { SET_LATEST_BLOCK_DATA } from 'src/storage/constants';

type setLatestBlocksDataType = {
    blocks?: Array<{}>,
    transactions?: Array<{}>,
};

export function setLatestBlocksData(data: setLatestBlocksDataType) {
    return {
        type: SET_LATEST_BLOCK_DATA,
        payload: data,
    };
}
