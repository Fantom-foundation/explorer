let express = require("express"),
  router = express.Router();
const utils = require("./utils");
const url = require("url");
const response = require("./response");
const userAccount = require("./transaction-mock-data");

/**
 * Get API to get transaction data.
 * @apiKey: Private Key
 * @address: Block address
 */
router.get("/transactions", (req, res) => {
  console.log("req111", req);
  utils.validateUrlKeys(
    req.query,
    [
      { key: "module", name: "Module" },
      { key: "address", name: "Address" },
      { key: "apikey", name: "APIKEY" }
    ],
    errorField => {
      console.log("errorField", errorField);
      if (!errorField) {
        console.log("Enter");
        const apiKeyPromise = utils.validateApiKey(req.query.apikey);
        console.log("apiKey", apiKeyPromise);
        apiKeyPromise
          .then(result => {
            console.log("result", result);
            if (result.status) {
              const array = [];
              for (const user of userAccount) {
                if (
                  user.to === req.query.address ||
                  user.from === req.query.address
                ) {
                  array.push(user);
                }
              }
              console.log("array", array);
              response.sendSuccess(array, res);
            } else {
              response.sendError("Invalid Api Key", res);
            }
          })
          .catch(error => {
            console.log("@@@error", error);
          });
      } else {
        response.sendError(errorField, res);
      }
    }
  );
});
module.exports = router;
