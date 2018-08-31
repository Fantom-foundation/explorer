/**
 * This file contains helping functions to get random strings of different sizes and types
 */

// Library to help you create random strings. ( https://www.npmjs.com/package/randomstring )
const randomstring = require('randomstring');

// Returns an alphanumeric random string
module.exports.randomstr = function () {
  return randomstring.generate();
};

// Returns an alphanumeric random string of specific size
module.exports.randomStringOfLength = function (ofLength) {
  return randomstring.generate(ofLength);
};

// Returns a long alphanumeric random string
module.exports.randomLongstr = function () {
  return `${randomstring.generate()}${randomstring.generate()}${randomstring.generate()}`;
};

// Returns a numeric random string of length 10
module.exports.random10Digits = function () {
  return randomstring.generate({
    length: 10,
    charset: '0123456789',
  });
};

