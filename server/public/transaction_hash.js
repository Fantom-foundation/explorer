let express = require('express'), router = express.Router();
const utils = require('./utils');
const url = require('url');
const response = require('./response');
const userAccount = require('./transaction-mock-data');


router.get('/transaction/:Tx_hash', (req, res) => {
  utils.validateUrlKeys(req.params,
    [
      { key: 'Tx_hash', name: 'TX_HASH' },
    ],
    (errorField) => {
      if (!errorField) {
        const array = [];
        for (const user of userAccount) {
          if (user.hash === req.params.Tx_hash) {
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
