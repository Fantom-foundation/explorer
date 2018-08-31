/**
 * Create Account API controller, which contains api to create a new account
 *
 */
const User = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');
module.exports = function (app) {
  /**
 * Post API which create account
 */
  app.post('/api/create-account', (req, res) => {
    console.log('req!!!!', req);
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
        { key: 'password', name: 'Password' },
        { key: 'password_hint', name: 'Password_Hint' },
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
              email: req.body.email,
            },
          }).then((userFromRepo) => {
            console.log('userFromRepo2323', userFromRepo);
            if (userFromRepo) {
              res.statusCode = 202;
              res.json({
                status: 202,
                message: 'Email Already Exist',
              });
              res.end();
            } else {
              const passwordHash = bcrypt.hashSync(req.body.password);
              if (req.body.password === req.body.repassword) {
                User.create({
                  email: req.body.email,
                  password: passwordHash,
                  password_hint: req.body.password_hint,
                }).then((result) => {
                  if (result) {
                    res.statusCode = 200;
                    res.json({
                      status: 200,
                      message: 'Account Created successfully',
                    });
                    res.end();
                  }
                }).catch((error) => {
                  console.log('error !!', error);
                });
              } else {
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: 'Password and Re-enter password must be same',
                });
                res.end();
              }
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
