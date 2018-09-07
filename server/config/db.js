const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const config = require('./config'); // Getting the environmental variables
const db = config.dbName; // Database Name
const user = config.dbUser; // Database Username
const password = config.dbPassword; // Database Password
const dbport = config.port; // hosting address of server
const host = config.host;
console.log(db, user, password);
const sequelize = new Sequelize(db, user, password, {
host,
port: dbport,
dialect: 'mysql', // Type of database, because Sequelize also support Postgres
logging: false, // Change to true if wants to see log of database
// dialectOptions: {
// ssl: 'Amazon RDS',
// },
pool: {
 max: 5,
 min: 0,
 idle: 10000,
},

});


/**
* Making connection
*/
sequelize
.authenticate()
.then(() => {
 sequelize.sync();
 console.log(`Connection has been established successfully to ${db}`);
 return null;
})
.catch((err) => {
 console.error(`Unable to connect to the ${db}:`, err);
});

module.exports = sequelize;
