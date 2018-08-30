const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fantom-wallet',
});
connection.connect((err) => {
  if (!err) {
    console.log('Database is connected');
  } else {
    console.log('Error while connecting with database');
  }
});
module.exports = connection;
