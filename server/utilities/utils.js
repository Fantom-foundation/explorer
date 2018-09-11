/**
 * This file contains few useful helping functions
 *
 */

// easy used 'mkdir', when dirpath or parent dirpath not exist, it will create the directory automatically. ( https://www.npmjs.com/package/mkdir-p )
const mkdir = require('mkdir-p');
// File I/O is provided by simple wrappers around standard POSIX functions ( https://nodejs.org/api/fs.html )
const fs = require('fs');
// Including random.js which contains helping functions for generating random strings
const random = require('./random');

// This helping function is for saving a file at given path,
// It takes two variables as input
// 1. Path to with file is to be saved
// 2. File
// It returns callback function containing two variable is response
// 1. Error message if any error occurred
// 2. The unique name of the file
module.exports.saveFileAt = function saveFileAt(path, file, callback) {
  // Checking if file is provided
  if (file) {
    // Making complete path
    const dir = __dirname + path;

    // Giving file a unique name
    const fileName = random.randomstr();
    // Creating parent directories if doest not exist
    mkdir(dir, err => {
      // Error handling
      if (err) {
        callback(err, fileName);
      } else {
        // Reading and then writing file to provided path
        fs.readFile(file.path, (error, data) => {
          // read file from the given path
          fs.writeFile(`${dir}/${fileName}.${file.extension}`, data, errors => {
            // write file in uploads folder
            callback(errors, fileName);
          });
        });
      }
    });
  } else {
    callback('nofile', '');
  }
};

// This helping function is for validating a request body with required fields,
// It takes two variables as input
// 1. Request body
// 2. The required fields
// It returns callback function containing one variable is response
// 1. Error message if any required key is missing or empty
module.exports.validateRequiredKeys = function(body, fields, callback) {
  let key = '';
  let name = '';
  let errorField = '';
  let value = '';

  // Traversing through the required fields
  for (let i = 0; i < fields.length; i += 1) {
    key = fields[i].key;
    name = fields[i].name;
    errorField = '';
    value = body[key] + '';
    console.log('value!!!!!!!', value);
    // if request body does not contain respective field then throw error
    if (!value || value.replace(/\s+/g, '') === '') {
      errorField = `${name} is required.`;
      // console.log('validate function call errorField', key, errorField);
      break;
    } else if (key === 'email' && !validateEmail(value)) {
      // if (body['player_name'] === body['email']) {
      //   errorField = '';
      // } else {
      //   errorField = 'Wrong email address.';
      // }
      errorField = 'Wrong email address.';
      break;
    } else if (
      (key === 'password' ||
        key === 'confirm_password' ||
        key === 'new_password' || key === 'current_password') &&
      !validatePassword(value)
    ) {
      errorField =
        'Password must be 8 characters long...';
      // console.log('%%%', errorField);
      break;
    }
  }
  // // console.log(" validate function call errorField",key, errorField);
  callback(errorField);
};

// This helping function returns date , takes DD/MM/YYYY as input parameter
module.exports.convertDDMMYYYYtoDate = function(d) {
  // validating format if valid the process else return input
  if (/\d{2}\/\d{2}\/\d{4}/g.test(d)) {
    const splitted = d.split('/');
    if (splitted.length > 3) {
      new Date(splitted[2], Number(splitted[1]) - 1, splitted[0]);
    } else {
      return d;
    }
  } else {
    return d;
  }
};

// This helping function returns number f dates between 2 dates, it takes 2 dates, date1 and date2 as input parameters
module.exports.getDaysFromTwoDates = function(date1, date2) {
  // Get 1 day in milliseconds
  const one_day = 1000 * 60 * 60 * 24; // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime(); // Calculate the difference in milliseconds
  const difference_ms = date2_ms - date1_ms; // Convert back to days and return
  return Math.round(difference_ms / one_day);
};

// This helping function returns date in MM/DD/YYYY, it takes date as input parameter
module.exports.formatDatetoMMddYYYY = function(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${month}/${day}/${year}`;
};

function validateEmail(email) {
  // console.log('email!!!', email);
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  // console.log('password@@@@@', password.length);
  //var re = /(?=^.{8,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  // console.log('&&&&****', password.length);
  if (password.length >= 8) {
    return true;
  }
  return false;
}


module.exports.validateUrlKeys = function(query, fields, callback) {
  let key = '';
  let name = '';
  let errorField = '';
  let value = '';

  // Traversing through the required fields
  for (let i = 0; i < fields.length; i += 1) {
    key = fields[i].key;
    name = fields[i].name;
    errorField = '';
    value = query[key] + '';
    // if request body does not contain respective field then throw error
    if (!value || value.replace(/\s+/g, '') === '') {
      errorField = `${name} is required.`;
      // console.log('validate function call errorField', key, errorField);
      break;
    } else if (key === 'address' && !validateAddress(value)) {
      // if (body['player_name'] === body['email']) {
      //   errorField = '';
      // } else {
      //   errorField = 'Wrong email address.';
      // }
      errorField = 'Wrong address.';
      break;
    } else if (
      (key === 'module') &&
      !validateModule(value)
    ) {
      errorField =
        'Module not found';
      // console.log('%%%', errorField);
      break;
    } else if ((key === 'apikey') && !validateApiKey(value)) {
      errorField = 'Api key not found';
      break;
    } else if ((key === 'Tx_hash') && !validateHash(value)) {
      errorField = 'Invalid hash..';
      break;
    }
  }
  // // console.log(" validate function call errorField",key, errorField);
  callback(errorField);
};

function validateHash(hash) {
  var re = /^0x([A-Fa-f0-9]{64})$/;
  return re.test(String(hash));
}

function validateAddress(address) {
  if (address.length === 42) {
    return true;
  }
  return false;
}
function validateModule(module) {
  if (module === 'account' || module === 'transaction') {
    return true;
  }
  return false;
}
function validateApiKey(value) {
  if (value === 'YourApiKeyToken') {
    return true;
  }
  return false;
}
