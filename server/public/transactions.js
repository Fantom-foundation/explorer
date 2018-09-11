let express = require('express'), router = express.Router();
const utils = require('../utilities/utils');
const url = require('url');
const response = require('../utilities/response');
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
        const array = [];
        for (const user of userAccount) {
          if (user.to === req.query.address || user.from === req.query.address) {
            array.push(user);
          }
        }
        response.sendSuccess(array, res);
      } else {
        response.sendError(0, res);
      }
    });
});
module.exports = router;
