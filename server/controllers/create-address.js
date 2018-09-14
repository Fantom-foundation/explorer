/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Addresses = require('../models/addresses');
const utils = require('../utilities/utils');

module.exports = function (app) {
  app.post('/api/create-addresses', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'address', name: 'ADDRESS' },
      ],
      (errorField) => {
        if (!errorField) {
          Addresses.create({
            address: req.body.address,
            balance: req.body.balance,
          })
          .then((result) => {
            if (result) {
              res.statusCode = 200;
              res.json({
                status: 200,
                result,
                message: 'Addresses fields created successfully',
              });
              res.end();
            }
          })
          .catch((error) => {
            console.log('error', error);
          });
        } else {
          res.statusCode = 205;
          res.json({
            status: 205,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
