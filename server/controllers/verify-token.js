/**
 * This is a sample API controller which only contains API.
 *
 */
const User = require('../models/users');
const utils = require('../utilities/utils');
const tokenExpirationTime = 28800000;
module.exports = function (app) {
  app.post('/api/verify-token', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email_token', name: 'Email Token' },
      ],
      (errorField) => {
        if (!errorField) {
          User.findOne({
            where: {
              email_token: req.body.email_token,
            },
          })
            .then((userFromRepo) => {
              if (!userFromRepo) {
                res.statusCode = 401;
                res.json({
                  status: 401,
                  message: 'Invalid token',
                });
                res.end();
                return;
              }
              if (userFromRepo) {
                // const tokenCreatedAt = new Date(userFromRepo.token_date).getTime();
                // const newTime = tokenCreatedAt + tokenExpirationTime;
                // const currentTime = new Date().getTime();
                // if (currentTime > newTime) {
                //   console.log('expiredToken');
                //   res.statusCode = 500;
                //   res.json({
                //     status: 500,
                //     message: 'Invalid token',
                //   });
                //   res.end();
                // } else {
                  User.update({
                    isVerified: true,
                    email_token: null,
                  }, {
                      where: {
                        email_token: req.body.email_token,
                      },
                    })
                    .then((result) => {
                      if (result) {
                        res.json({
                          status: 200,
                          message: ' Email Token verified successfully ',
                          result: userFromRepo,
                        });
                        res.end();
                      } else {
                        res.json({
                          status: 202,
                          message: ' Email Token verification unsuccessfully',
                        });
                        res.end();
                      }
                    })
                    .catch((error) => {
                      res.statusCode = 203;
                      res.json({
                        status: 203,
                        message: error,
                      });
                      res.end();
                    });
                //}
                 
              }
            })
            .catch((err) => {
              res.statusCode = 205;
              res.json({
                status: 205,
                message: err,
              });
              res.end();
            });
        } else {
          res.statusCode = 207;
          res.json({
            status: 207,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
