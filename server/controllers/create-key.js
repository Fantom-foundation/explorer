const Apikey = require("../models/api_keys");
const bcrypt = require("bcrypt-nodejs");
const utils = require("../utilities/utils");

module.exports = function(app) {
  /**
   * Post API which create api-key for authentication
   */
  app.post("/api/api_key", (req, res) => {
    utils.validateRequiredKeys(
      req.body,
      [{ key: "email", name: "Email" }, { key: "api_name", name: "API_NAME" }],
      errorField => {
        if (!errorField) {
          const key = bcrypt.hashSync(req.body.email);
          const timeStamp = new Date().getTime();
          const apiKey = key + timeStamp;
          console.log("Key!!!", apiKey);
          Apikey.create({
            user_id: req.body.userId,
            api_key: apiKey,
            api_name: req.body.apiName
          })
            .then(result => {
              if (result) {
                res.statusCode = 200;
                res.json({
                  status: 200,
                  result,
                  message: "Api Key Created successfully"
                });
                res.end();
              }
            })
            .catch(error => {
              console.log("error !!", error);
            });
        } else {
          res.statusCode = 203;
          res.json({
            status: 203,
            message: "Api key not Created successfully"
          });
          res.end();
        }
      }
    );
  });
};
