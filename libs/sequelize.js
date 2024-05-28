const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = { dialect: config.dbEngine, logging: config.isProd ? false : true };

if (config.isProd) {
  options.dialectModule = require('pg');
}

const sequelize = new Sequelize(config.dbURL, options);

setupModels(sequelize);

// sequelize.sync();
// Creates new tables according to the schema specified in the model.
// a better approach to handle this is with migrations.

module.exports = sequelize;
