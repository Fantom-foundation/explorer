// @flow

/**
 * @method toFixed : Function to round off number value
 *
 * @param num : Number or String to be rounded.
 * @param fixed :  Number of decimal position upto which 'num' is rounded.
 */
export function toFixed(num: string | number, fixed: number): string {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    const match = num.toString().match(re);

    return match ? match[0] : '--';
}
