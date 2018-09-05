/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const User = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = function (app) {
  /**
 * Post API which create account
 */
  app.post('/api/validate-name', (req, res) => {
    console.log('req!!!!', req);
    utils.validateRequiredKeys(req.body,
      [
        { key: 'user', name: 'Email or Account Name' },
      ],
      (errorField) => {
        if (!errorField) {
          User.findOne({
            where: {
              [Op.or]: [{ account_name: req.body.user }, { email: req.body.user }],
            },
          }).then((userFromRepo) => {
            console.log('userFromRepo2323', userFromRepo);
            if (userFromRepo) {
              res.statusCode = 202;
              res.json({
                status: 202,
                message: 'User Already Exist',
              });
              res.end();
            } else {
              res.statusCode = 200;
              res.json({
                status: 200,
                message: 'User doesn\'t Exist',
              });
              res.end();
            }
          });
        } else {
          res.statusCode = 202;
          res.json({
            status: 202,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
