const Blocks = require("../models/blocks");
const utils = require("../utilities/utils");

module.exports = function(app) {
  /**
   * Post API which stores block_number, hash, size and timestamp in Blocks table.
   */
  app.post("/api/create-blocks", (req, res) => {
    utils.validateRequiredKeys(
      req.body,
      [{ key: "hash", name: "HASH" }],
      errorField => {
        if (!errorField) {
          console.log("req.body!!", req.body);
          Blocks.create({
            block_number: req.body.block_number,
            hash: req.body.hash,
            size: req.body.size,
            timestamp: req.body.timestamp
          })
            .then(result => {
              if (result) {
                res.statusCode = 200;
                res.json({
                  status: 200,
                  result,
                  message: "Blocks fields created successfully"
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
