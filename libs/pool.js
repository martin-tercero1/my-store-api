const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; //

// const pool = new Pool({
//   host: config.dbHost, // because we are using docker
//   port: config.dbPort,
//   user: 'martin',
//   password: 'admin123',
//   database: 'my_store',
// });

const pool = new Pool({
  connectionString: URI
});
module.exports = pool;
