'use strict';

const { OrdersProductsSchema, ORDERS_PRODUCTS_TABLE } = require('./../models/ordersProductsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrdersProductsSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  },
};
