/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Transaction = require('../models/transactions');
const utils = require('../utilities/utils');

module.exports = function (app) {
  app.post('/api/address-transaction', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'api_key', name: 'API_KEY' },
        { key: 'address', name: 'ADDRESS' },
      ],
      (errorField) => {
        if (!errorField) {
          if (req.body.api_key === 'qscvfgrtmncefiur2345') {
            Transaction.findAll({
              [Op.or]: [{ address_from: req.body.address }, { address_to: req.body.address }],
            })
          .then((result) => {
            if (result) {
              res.statusCode = 200;
              res.json({
                status: 200,
                result,
                message: 'transaction successful',
              });
              res.end();
            }
          })
          .catch((error) => {
            console.log('error', error);
          });
          }
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
