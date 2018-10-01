/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const Transaction = require("../models/transactions");
const utils = require("../utilities/utils");

module.exports = function(app) {
  /**
   * Post API which stores data in Transaction table.
   */
  app.post("/api/create-transactions", (req, res) => {
    utils.validateRequiredKeys(
      req.body,
      [{ key: "transaction_hash", name: "TRANSACTION_HASH" }],
      errorField => {
        if (!errorField) {
          Transaction.create({
            block_id: req.body.blockId,
            transaction_hash: req.body.transaction_hash,
            value: req.body.value,
            tx_fee: req.body.fee,
            gas_used: req.body.gasUsed,
            cumulative_gas_used: req.body.cumulativeGasUsed,
            address_from: req.body.fromAddress,
            address_to: req.body.toAddress
          })
            .then(result => {
              if (result) {
                res.statusCode = 200;
                res.json({
                  status: 200,
                  result,
                  message: "transaction successful"
                });
                res.end();
              }
            })
            .catch(error => {
              console.log("error", error);
            });
        } else {
          res.statusCode = 205;
          res.json({
            status: 205,
            message: errorField
          });
          res.end();
        }
      }
    );
  });
};
