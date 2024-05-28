const { Pool } = require('pg');
const { config } = require('../config/config');

let URI = '';

if (config.isProd) {
  URI = config.dbURL;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; //
}
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
