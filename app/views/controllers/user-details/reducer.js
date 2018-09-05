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
 // debugger;
  switch (action.type) {
    case SET_USER_DETAILS:
      return state.set('userDetails', action.userDetails);
    case UPDATE_USER_DETAILS:
   // debugger;
      const value = state.get('userDetails');
      console.log('Value is', value);
      const updatedValue = {
        ...value,
        ...action.userDetails,
      };
      console.log('updatedValue is!!1', updatedValue);
      return state.set('userDetails', updatedValue);
    default:
      return state;
  }
}

export default loginReducer;
