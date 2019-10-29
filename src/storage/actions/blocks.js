import * as types from 'src/storage/constants';

export function setBlockData(data) {
  return {
    type: types.SET_BLOCK_DATA,
    blocksDetails: data.payload,
  };
}
