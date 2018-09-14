/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USER_DETAILS } from '../constants';

const initialState = fromJS({
  userDetails: {
    id: '',
    email: '',
  },
});

function loginReducer(state = initialState, action) {
 // debugger;
  switch (action.type) {
    case SET_USER_DETAILS:
      return state.set('userDetails', action.userDetails);
    default:
      return state;
  }
}

export default loginReducer;
