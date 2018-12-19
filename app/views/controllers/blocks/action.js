import * as types from 'views/controllers/constants';

export function setBlockData(data) {
  console.log(' blockData action: ', data);
  return {
    type: types.SET_BLOCK_DATA,
    blocksDetails: data.payload,
  };
}
