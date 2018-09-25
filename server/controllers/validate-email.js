const User = require("../models/users");
const bcrypt = require("bcrypt-nodejs");
const utils = require("../utilities/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
  /**
   * Post API which validate user email that email is alredy exist in database or not.
   */
  app.post("/api/validate-email", (req, res) => {
    console.log("req!!!!", req);
    utils.validateRequiredKeys(
      req.body,
      [{ key: "email", name: "Email" }],
      errorField => {
        if (!errorField) {
          User.findOne({
            where: {
              email: req.body.email
            }
          }).then(userFromRepo => {
            if (userFromRepo) {
              res.statusCode = 202;
              res.json({
                status: 202,
                message: "User Already Exist"
              });
              res.end();
            } else {
              res.statusCode = 200;
              res.json({
                status: 200,
                message: "User doesn't Exist"
              });
              res.end();
            }
          });
        } else {
          res.statusCode = 202;
          res.json({
            status: 202,
            message: errorField
          });
          res.end();
        }
      }
    );
  });
};
