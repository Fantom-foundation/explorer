import * as types from 'views/controllers/constants';

export function setUserDetails({ user, icon }) {
  return {
    type: types.SET_USER_DETAILS,
    userDetails: { user, icon },
  };
}


export function updateUserDetails({ address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey }) {
  return {
    type: types.UPDATE_USER_DETAILS,
    details: { address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey },
  };
}
