import React from 'react';

export const scientificToDecimal = (num) => {
    const sign = Math.sign(num);
    // if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
      const zero = '0';
      const parts = String(num).toLowerCase().split('e'); // split into coeff and exponent
      const e = parts.pop(); // store the exponential part
      let l = Math.abs(e); // get the number of zeros
      const direction = e / l; // use to determine the zeroes on the left or right
      const coeff_array = parts[0].split('.');
  
      if (direction === -1) {
        coeff_array[0] = Math.abs(coeff_array[0]);
        num = `${zero}.${new Array(l).join(zero)}${coeff_array.join('')}`;
      }
      else {
        const dec = coeff_array[1];
        if (dec) l -= dec.length;
        num = coeff_array.join('') + new Array(l + 1).join(zero);
      }
    }
  
    if (sign < 0) {
      num = -num;
    }
  
    return num;
  }