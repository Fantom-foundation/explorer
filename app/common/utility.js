import HttpDataProvider from '../utils/httpProvider';

export function isUserLoggedIn() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === true || isLoggedIn === 'true') {
    return true;
  }
  return false;
}
