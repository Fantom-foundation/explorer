/**
 * This is sample model of Users , It contains following columns
 *
 * 1. Username whi
 * 2. Password which is The HMAC ofch is unique user entered password
 * 3. passwordSalt the salt with which HMAC was generated
 *
 */

// Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING, // Type of column
    unique: true, // unique constraint
  },
  email_token: {
    type: Sequelize.STRING, // Type of column
  },
  // api_key: {
  //   type: Sequelize.STRING, // Type of column
  // },
  isTokenVerified: {
    type: Sequelize.BOOLEAN,
  },
  // isKeyVerified: {
  //   type: Sequelize.BOOLEAN,
  // },
  expire_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  password: {
    type: Sequelize.STRING,
  },
});

