import * as types from 'src/storage/constants';

export function setUserDetails({ id, email }) {
  return {
    type: types.SET_USER_DETAILS,
    userDetails: { id, email },
  };
}
