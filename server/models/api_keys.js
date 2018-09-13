const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('api_keys', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER, // Type of column
  },
  api_key: {
    type: Sequelize.STRING, // Type of column
  },
  api_name: {
    type: Sequelize.STRING,
  },
});

