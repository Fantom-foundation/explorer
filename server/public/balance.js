var express = require('express'), router = express.Router();
const utils = require('./utils');
const response = require('./response');
const userAccount = require('./balance-mock-data');

router.get('/balance', function(req, res) {
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
            for(const user of userAccount) {
              if (user.address === req.query.address) {
                response.sendSuccess(user.balance.toString(), res);
              }
            }
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
