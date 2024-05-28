'use strict';
const { DataTypes } = require('sequelize');

const { CategoriesSchema, CATEGORIES_TABLE } = require('./../models/categoriesModel');
const { ProductsSchema, PRODUCTS_TABLE } = require('./../models/productsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema)
    await queryInterface.createTable(PRODUCTS_TABLE, ProductsSchema);
  },

  async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(CATEGORIES_TABLE);
        await queryInterface.dropTable(PRODUCTS_TABLE);
  },
};
