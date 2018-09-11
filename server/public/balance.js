var express = require('express'), router = express.Router();
const utils = require('../utilities/utils');
const response = require('../utilities/response');
const userAccount = require('./balance-mock-data');

router.get('/balance-api', function(req, res) {
  utils.validateUrlKeys(req.query,
    [
      { key: 'module', name: 'Module' },
      { key: 'address', name: 'Address' },
      { key: 'apikey', name: 'APIKEY' },
    ],
    (errorField) => {
      if (!errorField) {
        for(const user of userAccount) {
          if (user.address === req.query.address) {
            response.sendSuccess(user.balance.toString(), res);
          }
        }
      } else {
        response.sendError(0, res);
      }
    });
});
module.exports = router;
