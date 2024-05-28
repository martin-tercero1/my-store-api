const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMERS_TABLE } = require('./customersModel');

const ORDERS_TABLE = 'orders';

const OrdersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // This kind of virtual property can be calculated only when the amount of data is relatively small
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.orders_products.amount)
        }, 0);
      }
      return 0;
    }
  }
};

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.customers, {
      as: 'customer',
    });
    this.belongsToMany(models.products, {
      as: 'items',
      through: models.orders_products,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'orders',
      timestamps: false,
    };
  }
}

module.exports = { Orders, OrdersSchema, ORDERS_TABLE };
