const { Model, DataTypes, Sequelize } = require('sequelize');
const { USERS_TABLE } = require('./usersModel');

const CUSTOMERS_TABLE = 'customers';

const CustomersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Customers extends Model {
  static associate(models) {
    this.belongsTo(models.users, { as: 'user' });
    this.hasMany(models.orders, { as: 'orders', foreignKey: 'customerId' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMERS_TABLE,
      modelName: 'customers',
      timestamps: false
    };
  }
}

module.exports = { Customers, CustomersSchema, CUSTOMERS_TABLE }
