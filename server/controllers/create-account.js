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
  app.post('/api/create-account', (req, res) => {
    console.log('req!!!!', req);
    utils.validateRequiredKeys(req.body,
      [
        { key: 'user', name: 'Email or Account Name' },
        { key: 'password', name: 'Password' },
        { key: 'password_hint', name: 'Password_Hint' },
        { key: 'icon', name: 'icon' },
      ],
      (errorField) => {
        let emailToken = bcrypt.hashSync(req.body.email);
        emailToken = `?${emailToken}`;
        const hostname = req.body.hostName;
        const port = hostname === 'localhost' ? ':3000' : '';
        const hyperText = hostname === 'localhost' ? 'http' : 'https';
        const registrationUrl = `${hyperText}://${hostname}${port}/verify-email${emailToken}`;
        console.log('************verifyMailLink', registrationUrl);
        if (!errorField) {
          User.findOne({
            where: {
              [Op.or]: [{ account_name: req.body.user }, { email: req.body.user }],
            },
          }).then((userFromRepo) => {
            if (userFromRepo) {
              res.statusCode = 202;
              res.json({
                status: 202,
                message: 'User Already Exist',
              });
              res.end();
            } else {
              const passwordHash = bcrypt.hashSync(req.body.password);
              if (req.body.user.includes('@')) {
                User.create({
                  email: req.body.user,
                  password: passwordHash,
                  password_hint: req.body.password_hint,
                  icon: req.body.icon,
                }).then((result) => {
                  if (result) {
                    res.statusCode = 200;
                    res.json({
                      status: 200,
                      result,
                      message: 'Account Created successfully',
                    });
                    res.end();
                  }
                }).catch((error) => {
                  console.log('error !!', error);
                });
              } else {
                User.create({
                  account_name: req.body.user,
                  password: passwordHash,
                  password_hint: req.body.password_hint,
                  icon: req.body.icon,
                }).then((result) => {
                  console.log('result!!', result);
                  if (result) {
                    res.statusCode = 200;
                    res.json({
                      status: 200,
                      result,
                      message: 'Account Created successfully',
                    });
                    res.end();
                  }
                }).catch((error) => {
                  console.log('error !!', error);
                });
              }
            }
          });
        } else {
          res.statusCode = 203;
          res.json({
            status: 203,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
