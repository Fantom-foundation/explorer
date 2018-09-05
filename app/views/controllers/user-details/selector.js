import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLoginUser = (state) => state.get('currentUserDetails');

/**
 * Select the language locale
 */

const getUserDetails = () => createSelector(
  selectLoginUser,
  (loginState) => {
  // debugger;
    const userDetails = loginState.get('userDetails');
    let user = '';
    let icon = '';
    let address = '';
    let seed = '';
    let mnemonic = '';
    let pubKey = '';
    let hexPrivateKey = '';
    let masterPrivateKey = '';
    if (userDetails) {
     //debugger;
     console.log('userDetails Value', userDetails);
      user = userDetails.user;
      icon = userDetails.icon;
      address = userDetails.address;
      seed = userDetails.seed;
      mnemonic = userDetails.mnemonic;
      pubKey = userDetails.pubKey;
      hexPrivateKey = userDetails.hexPrivateKey;
      masterPrivateKey = userDetails.masterPrivateKey;
    }
    if (user === undefined) {
      user = userDetails.get('user');
    }
    if (icon === undefined) {
      icon = userDetails.get('icon');
    }
    if (address === undefined) {
      address = userDetails.get('address');
    }
    if (seed === undefined) {
      seed = userDetails.get('seed');
    }
    if (mnemonic === undefined) {
      mnemonic = userDetails.get('mnemonic');
    }
    if (pubKey === undefined) {
      pubKey = userDetails.get('pubKey');
    }
    if (hexPrivateKey === undefined) {
      hexPrivateKey = userDetails.get('hexPrivateKey');
    }
    if (masterPrivateKey === undefined) {
      masterPrivateKey = userDetails.get('masterPrivateKey');
    }
    return { user, icon, address, seed, mnemonic, pubKey, hexPrivateKey, masterPrivateKey };
  }
);

export {
  selectLoginUser,
  getUserDetails,
};
