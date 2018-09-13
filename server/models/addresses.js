const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('address', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  addresses: {
    type: Sequelize.STRING, // Type of column
  },
  balance: {
    type: Sequelize.STRING,
  },
});

