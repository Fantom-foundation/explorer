/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Blocks = require('../models/blocks');
const utils = require('../utilities/utils');

module.exports = function (app) {
  app.post('/api/get-blocks', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'api_key', name: 'API_KEY' },
      ],
      (errorField) => {
        if (!errorField) {
          if (req.body.api_key === 'qscvfgrtmncefiur2345') {
            Blocks.findAll()
          .then((result) => {
            if (result) {
              res.statusCode = 200;
              res.json({
                status: 200,
                result,
                message: 'blocks data fetched successful',
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
