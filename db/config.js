const { config } = require('./../config/config');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log('config', config.dbURL);

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
