/**
 * This is a sample API controller which only contains API.
 *
 */
const User = require('../models/users');
const utils = require('../utilities/utils');
const tokenExpirationTime = 28800000;
module.exports = function (app) {
  app.post('/api/verify-key', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'api_key', name: 'API Key' },
      ],
      (errorField) => {
        if (!errorField) {
          User.findOne({
            where: {
              api_key: req.body.api_key,
            },
          })
            .then((userFromRepo) => {
              if (!userFromRepo) {
                res.statusCode = 401;
                res.json({
                  status: 401,
                  message: 'Invalid Key',
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
                    isKeyVerified: true,
                    // email_token: null,
                  }, {
                      where: {
                        api_key: req.body.api_key,
                      },
                    })
                    .then((result) => {
                      if (result) {
                        res.json({
                          status: 200,
                          message: ' API key verified successfully ',
                          result: userFromRepo,
                        });
                      } else {
                        res.json({
                          status: 202,
                          message: ' API key verification unsuccessfully',
                        });
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
