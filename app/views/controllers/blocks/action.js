import * as types from 'views/controllers/constants';

export function setBlockData(data) {
  return {
    type: types.SET_BLOCK_DATA,
    blocksDetails: data.payload,
  };
}
