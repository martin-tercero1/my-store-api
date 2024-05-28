'use strict';

const {
  OrdersSchema,
  ORDERS_TABLE,
} = require('./../models/ordersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDERS_TABLE);
  },
};
