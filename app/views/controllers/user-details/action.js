import * as types from 'views/controllers/constants';

export function setUserDetails({ user, icon, address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey }) {
  return {
    type: types.SET_USER_DETAILS,
    userDetails: { user, icon, address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey },
  };
}


export function updateUserDetails({ address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey }) {
  return {
    type: types.UPDATE_USER_DETAILS,
    details: { address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey },
  };
}
