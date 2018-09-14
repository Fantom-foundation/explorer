/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Blocks = require('../models/blocks');
const utils = require('../utilities/utils');

module.exports = function (app) {
  app.post('/api/create-blocks', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'hash', name: 'HASH' },
      ],
      (errorField) => {
        if (!errorField) {
          Blocks.create({
            hash: req.body.hash,
            size: req.body.size,
            timestamp: req.body.timestamp,
          })
          .then((result) => {
            if (result) {
              res.statusCode = 200;
              res.json({
                status: 200,
                result,
                message: 'Blocks fields created successfully',
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
