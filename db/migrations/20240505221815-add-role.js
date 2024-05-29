'use strict';

const { USERS_TABLE } = require('./../models/usersModel');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USERS_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USERS_TABLE, 'role');
  }
};
