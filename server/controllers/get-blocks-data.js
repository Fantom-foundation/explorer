const Blocks = require("../models/blocks");
const utils = require("../utilities/utils");

module.exports = function(app) {
  /**
   * Post api which get data from blocks table
   */
  app.post("/api/get-blocks", (req, res) => {
    console.log("reqQW!!!", req.headers);
    console.log("********", req.headers.api_key);
    utils.validateRequiredKeys(
      req.headers,
      [{ key: "api_key", name: "API_KEY" }],
      errorField => {
        if (!errorField) {
          if (req.headers.api_key === "qscvfgrtmncefiur2345") {
            Blocks.findAll()
              .then(result => {
                if (result) {
                  res.statusCode = 200;
                  res.json({
                    status: 200,
                    result,
                    message: "blocks data fetched successful"
                  });
                  res.end();
                }
              })
              .catch(error => {
                console.log("error", error);
              });
          }
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
