const Apikey = require("../models/api_keys");
const utils = require("../utilities/utils");

module.exports = function(app) {
  /**
   * Post api which verify user private key.
   */
  app.post("/api/verify-key", (req, res, next) => {
    utils.validateRequiredKeys(
      req.body,
      [{ key: "api_key", name: "API Key" }],
      errorField => {
        if (!errorField) {
          Apikey.findOne({
            where: {
              api_key: req.body.api_key
            }
          })
            .then(userFromRepo => {
              if (!userFromRepo) {
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: "Invalid Key"
                });
                res.end();
                return;
              } else {
                res.json({
                  status: 200,
                  message: " API key verified successfully ",
                  result: userFromRepo
                });
                res.end();
              }
            })
            .catch(err => {
              console.log("error", err);
            });
        } else {
          res.statusCode = 203;
          res.json({
            status: 203,
            message: errorField
          });
          res.end();
        }
      }
    );
  });
};
