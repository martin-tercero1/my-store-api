'use strict';

const { USERS_TABLE } = require('./../models/usersModel');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USERS_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USERS_TABLE, 'recovery_token');
  }
};
