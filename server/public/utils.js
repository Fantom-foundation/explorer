const User = require('../models/users');

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
      errorField = 'Wrong address.';
      break;
    } else if (
        (key === 'module') &&
        !validateModule(value)
      ) {
      errorField =
          'Module not found';
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
  const re = /^0x([A-Fa-f0-9]{64})$/;
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

const validateApiKey = (apiKey) => {
  const obj = {};
  const promise = new Promise((resolve, reject) => {
    User.findOne({
      where: {
        api_key: apiKey,
      },
    })
        .then((userFromRepo) => {
          if (!userFromRepo) {
            obj.status = false;
            resolve(obj);
            return;
          }
          if (userFromRepo) {
            User.update({
              isKeyVerified: true,
            }, {
              where: {
                api_key: apiKey,
              },
            })
                .then((result) => {
                  if (result) {
                    obj.status = true;
                    resolve(obj);
                  }
                })
                .catch((error) => {
                  reject(error);
                });
          }
        })
        .catch((err) => {
          reject(err);
        });
  });
  return promise;
};

module.exports.validateApiKey = validateApiKey;
