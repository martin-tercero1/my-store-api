'use strict';

const { UserSchema, USERS_TABLE } = require('./../models/usersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USERS_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USERS_TABLE, 'role');
  }
};
