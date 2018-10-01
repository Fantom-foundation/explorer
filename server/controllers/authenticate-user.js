const User = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');


module.exports = function (app) {
  /**
   * Post API which authenticates credentials at the time of login with already registered email
   */
  app.post('/api/authenticate-user', (req, res) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
        { key: 'password', name: 'Password' },
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
                console.log(' email doesn\'t exist : ');
                res.statusCode = 203;
                res.json({
                  status: 203,
                  message: 'email doesn\'t exist',
                });
                res.end();
                return;
              }
              const isValidPassword = bcrypt.compareSync(req.body.password, userFromRepo.password);
              if (userFromRepo.email && isValidPassword) {
                console.log(' User successfully authenticated : ');
                res.statusCode = 200;
                res.json({
                  status: 200,
                  message: ' User successfully authenticated ',
                  user: userFromRepo,
                });
              } else {
                console.log('Email or Password Invalid');
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: ' Email or Password Invalid ',
                });
                res.end();
              }
            });
        } else {
          console.log('wrong password');
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
