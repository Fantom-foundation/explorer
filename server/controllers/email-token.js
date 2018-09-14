/**
 * This is a sample API controller which only contains API.
 *
 */
const User = require('../models/users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');
const EmailHelper = require('../send-email');
module.exports = function (app) {
  /**
   * Post API which authenticates email credentials at the time of forgot password for already registered players
   */
  app.post('/api/email-token', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
      ],
      (errorField) => {
        if (!errorField) {
          User.findOne({
            where: {
              email: req.body.email,
            },
          })
            .then((userFromRepo) => {
              if (!userFromRepo) {
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: 'Email doesn\'t exist',
                });
                res.end();
                return;
              }
              if (userFromRepo.email) {
                let emailToken = bcrypt.hashSync(userFromRepo.email);
                emailToken = `?${emailToken}`;
                const tokenDate = new Date();
                User.update({
                  email_token: emailToken,
                  expire_date: tokenDate,
                }, {
                  where: {
                    email: userFromRepo.email,
                  },
                }).then((response) => {
                  const hostname = req.body.hostName;
                  const port = hostname === 'localhost' ? ':3000' : '';
                  const hyperText = hostname === 'localhost' ? 'http' : 'https';
                  const registrationUrl = `http://localhost:3000/verify-email${emailToken}`;
                  console.log('*******verifyMailLinkResend', registrationUrl);
                  EmailHelper.sendMail(userFromRepo.email, registrationUrl);
                  res.statusCode = 200;
                  res.json({
                    status: 200,
                    message: ' Email successfully authenticated ',
                    registrationUrl,
                  });
                })
                  .catch((err) => {
                    // console.log(err, 'err in updating token'); 
                    res.statusCode = 203;
                    res.json({
                      status: 203,
                      message: ' Email token cannot updated',
                    });
                    res.end();
                  });
              } else {
                res.statusCode = 205;
                res.json({
                  status: 205,
                  message: ' Invalid email ',
                });
                res.end();
              }
            })
            .catch((err) => {
              console.log('err', err);
            });
        } else {
          res.statusCode = 209;
          res.json({
            status: 209,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
