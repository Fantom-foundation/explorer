let express = require('express'), router = express.Router();
const utils = require('./utils');
const url = require('url');
const response = require('./response');
const userAccount = require('./transaction-mock-data');

router.get('/transactions', (req, res) => {
  utils.validateUrlKeys(req.query,
    [
      { key: 'module', name: 'Module' },
      { key: 'address', name: 'Address' },
      { key: 'apikey', name: 'APIKEY' },
    ],
    (errorField) => {
      if (!errorField) {
        const apiKeyPromise = utils.validateApiKey(req.query.apikey);
        apiKeyPromise.then((result) => {
          if (result.status) {
            const array = [];
            for (const user of userAccount) {
              if (user.to === req.query.address || user.from === req.query.address) {
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
