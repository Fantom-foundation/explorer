/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Transaction = require('../models/transactions');
const utils = require('../utilities/utils');

module.exports = function (app) {
  app.post('/api/get-transactions', (req, res) => {
    utils.validateRequiredKeys(req.headers,
      [
        { key: 'api_key', name: 'API_KEY' },
      ],
      (errorField) => {
        if (!errorField) {
          if (req.headers.api_key === 'qscvfgrtmncefiur2345') {
            Transaction.findAll({
              limit: parseInt(req.headers.limit, 10),
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
