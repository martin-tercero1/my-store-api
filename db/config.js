const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
console.log(USER);
console.log(PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: config.dbURL,
    dialect: config.dbEngine
  },
    production: {
      url: config.dbURL,
      dialect: config.dbEngine,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        }
      }
    }
}
