/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const User = require('../models/users');
const EmailHelper = require('../send-email');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');
//const Sequelize = require('sequelize');
// const rand = require('generate-key');
//const Op = Sequelize.Op;
module.exports = function (app) {
  /**
 * Post API which create account
 */
  app.post('/api/create-account', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
        { key: 'password', name: 'Password' },
        // { key: 'password_hint', name: 'Password_Hint' },
      ],
      (errorField) => {
        let emailToken = bcrypt.hashSync(req.body.email);
        const apiKey = bcrypt.hashSync(req.body.email);
        emailToken = `?${emailToken}`;
        const hostname = req.body.hostName;
        const port = hostname === 'localhost' ? ':3000' : '';
        const hyperText = hostname === 'localhost' ? 'http' : 'https';
        const registrationUrl = `http://localhost:3000/verify-email${emailToken}`;
        console.log('************verifyMailLink', registrationUrl);
        if (!errorField) {
          User.findOne({
            where: {
              email: req.body.email,
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
              const timeStamp = new Date().getTime();
              const key = apiKey + timeStamp;
              console.log('Key!!!', key);
              if (req.body.password === req.body.repassword) {
                User.create({
                  email: req.body.email,
                  password: passwordHash,
                  // password_hint: req.body.password_hint,
                  email_token: emailToken,
                 // api_key: key,
                }).then((result) => {
                  if (result) {
                    EmailHelper.sendMail(req.body.email, registrationUrl);
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
                res.statusCode = 203;
                res.json({
                  status: 203,
                  message: 'Password and Re-enter password must be same',
                });
                res.end();
              }
            }
          });
        } else {
          res.statusCode = 205;
          res.json({
            status: 205,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
