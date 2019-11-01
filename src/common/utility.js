export function isUserLoggedIn() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === true || isLoggedIn === 'true') {
    return true;
  }

  return false;
}

/**
 * @method toFixed : Function to round off number value
 *
 * @param num : Number to be rounded.
 * @param fixed :  Count of decimal position upto which 'num' is rounded.
 */
export function toFixed(num, fixed) {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
}
