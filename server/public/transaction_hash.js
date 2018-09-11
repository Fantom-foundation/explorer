let express = require('express'), router = express.Router();
const utils = require('./utils');
const url = require('url');
const response = require('./response');
const userAccount = require('./transaction-mock-data');


router.get('/transaction_hash', (req, res) => {
  console.log('req.params', req.query);
  utils.validateUrlKeys(req.query,
    [
      { key: 'module', name: 'Module' },
      { key: 'apikey', name: 'APIKEY' },
      { key: 'txhash', name: 'TXHASH' },
    ],
    (errorField) => {
      console.log('@@@', req.query, errorField);
      if (!errorField) {
        console.log('!!!', req.query);
        const apiKeyPromise = utils.validateApiKey(req.query.apikey);
        apiKeyPromise.then((result) => {
          if (result.status) {
            const array = [];
            for (const user of userAccount) {
              if (user.hash === req.query.txhash) {
                array.push(user);
              }
            }
            response.sendSuccess(array, res);
          } else {
            response.sendError('Invalid Api Key', res);
          }
        }).catch((error) => {
          console.log('@@@error', error);
        });
      } else {
        response.sendError(errorField, res);
      }
    });
});
module.exports = router;
