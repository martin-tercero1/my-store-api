'use strict';

const { CustomersSchema, CUSTOMERS_TABLE } = require('./../models/customersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMERS_TABLE, CustomersSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMERS_TABLE);
  },
};
