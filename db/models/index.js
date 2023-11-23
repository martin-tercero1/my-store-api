const { Users, UserSchema } = require('./usersModel')

function setupModels(sequelize) {
  Users.init(UserSchema, Users.config(sequelize));
}

module.exports = { setupModels };
