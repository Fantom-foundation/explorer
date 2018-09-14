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
    let id = '';
    let email = '';
    if (userDetails) {
     //debugger;
     console.log('userDetails Value', userDetails);
      id = userDetails.id;
      email = userDetails.email;
    }
    if (id === undefined) {
      id = userDetails.get('id');
    }
    if (email === undefined) {
      email = userDetails.get('email');
    }
    return { id, email };
  }
);

export {
  selectLoginUser,
  getUserDetails,
};
