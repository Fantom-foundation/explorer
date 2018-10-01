const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('chat', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_name: {
    type: Sequelize.STRING, // Type of column
  },
  message: {
    type: Sequelize.STRING, // Type of column
  },
  linked_to: {
    type: Sequelize.STRING,
  },
});

