const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDERS_TABLE } = require('./ordersModel');
const { PRODUCTS_TABLE } = require('./productsModel');

const ORDERS_PRODUCTS_TABLE = 'orders_products';

const OrdersProductsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class OrdersProducts extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      modelName: 'orders_products',
      timestamps: false,
    };
  }
}

module.exports = {
  OrdersProducts,
  OrdersProductsSchema,
  ORDERS_PRODUCTS_TABLE,
};
