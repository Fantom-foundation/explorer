/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USER_DETAILS, UPDATE_USER_DETAILS } from '../constants';

const initialState = fromJS({
  userDetails: {
    user: '',
    icon: '',
    address: '',
    seed: '',
    mnemonic: '',
    pubKey: '',
    hexPrivateKey: '',
    masterPrivateKey: '',
  },
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return state.set('userDetails', action.userDetails);
    case UPDATE_USER_DETAILS:
      const value = state.get('userDetails');
      const updatedValue = {
        ...value,
        ...action.details,
      };
      return state.set('userDetails', updatedValue);
    default:
      return state;
  }
}

export default loginReducer;
