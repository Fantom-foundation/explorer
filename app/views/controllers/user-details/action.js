import * as types from 'views/controllers/constants';

export function setUserDetails({ id, email }) {
  return {
    type: types.SET_USER_DETAILS,
    userDetails: { id, email },
  };
}
