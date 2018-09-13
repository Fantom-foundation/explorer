const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('blocks', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  hash: {
    type: Sequelize.STRING, // Type of column
  },
  size: {
    type: Sequelize.STRING, // Type of column
  },
  timestamp: {
    type: Sequelize.STRING,
  },
});

