var express = require('express'), router = express.Router();
const utils = require('../utilities/utils');
const url = require('url');
const response = require('../utilities/response');
const userAccount = require('./mock-data');

router.get('/account-api', function(req, res) {
  //const q = url.parse('https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=YourApiKeyToken', true).query;
  //console.log('Query', q, q.address);
  utils.validateUrlKeys(req.query,
    [
      { key: 'module', name: 'Module' },
      { key: 'address', name: 'Address' },
      { key: 'apikey', name: 'APIKEY' },
    ],
    (errorField) => {
      if (!errorField) {
        for(const user of userAccount) {
          console.log('####user', user);
          if (user.address === req.query.address) {
            console.log('Balance is!!', user.balance);
            response.sendSuccess(user.balance, res);
            // res.json({
            //   status: 200,
            //   user: user.balance,
            //   message: ' User successfully authenticated ',
            // });
            // res.end();
          }
        }
      } else {
        response.sendError(0, res);
        // res.statusCode = 202;
        // res.json({
        //   status: 202,
        //   message: errorField,
        // });
        // res.end();
      }
    });
});
module.exports = router;
