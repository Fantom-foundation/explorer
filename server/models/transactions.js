const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');

// Creating Table with name users
module.exports = db.define('transactions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  block_id: {
    type: Sequelize.INTEGER, // Type of column
  },
  transaction_hash: {
    type: Sequelize.STRING, // Type of column
  },
  value: {
    type: Sequelize.STRING,
  },
  tx_fee: {
    type: Sequelize.STRING,
  },
  gas_used: {
    type: Sequelize.STRING,
  },
  cumulative_gas_used: {
    type: Sequelize.STRING,
  },
  address_from: {
    type: Sequelize.STRING,
  },
  address_to: {
    type: Sequelize.STRING,
  },
});

