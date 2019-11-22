// @flow

export function checkSearchString(hash: string) {
    const validHashLength = 66;

    if (hash && hash.length === validHashLength) {
        return { isValid: true, type: 'hash' };
    } else if (/^\d+$/.test(hash)) {
        return { isValid: true, type: 'number' };
    }

    return { isValid: false };
}

export const scientificToDecimal = (num: number) => {
    const sign = Math.sign(num);
    let result = '';
    // if the number is in scientific notation remove it
    if (/\d+\.?\d*e[+-]*\d+/i.test(num.toString(10))) {
        const zero = '0';
        const parts = num.toString(10)
            .toLowerCase()
            .split('e'); // split into coeff and exponent
        const e = parseInt(parts.pop(), 10); // store the exponential part
        let l = Math.abs(e); // get the number of zeros
        const direction = e / l; // use to determine the zeroes on the left or right
        const coeffArray = parts[0].split('.')
            .map((part) => parseInt(part, 10));

        if (direction === -1) {
            coeffArray[0] = Math.abs(coeffArray[0]);
            result = `${zero}.${new Array(l).join(zero)}${coeffArray.join('')}`;
        } else {
            const dec = coeffArray[1];

            if (dec) {
                l -= dec.toString().length;
            }

            result = coeffArray.join('') + new Array(l + 1).join(zero);
        }
    }

    if (sign < 0) {
        result = `-${result}`;
    }

    return result;
};