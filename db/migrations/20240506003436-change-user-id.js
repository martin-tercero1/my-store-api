'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMERS_TABLE } = require('./../models/customersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMERS_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable(CUSTOMERS_TABLE);
  },
};
