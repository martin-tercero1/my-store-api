const { Model, DataTypes, Sequelize } = require('sequelize');

const USERS_TABLE = 'users';

// Defines the structure in the database, instead of validating the data like Joi
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

// Thanks to Model we can access methods like find
// Static methods allows to access them without having a declaration
class Users extends Model {
  static associate(models) {
    // relations to models
    this.hasOne(models.customers, { as: 'customer', foreignKey: 'user_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      table: USERS_TABLE,
      modelName: 'users',
      tiemstampts: false
    }
  }
}

module.exports = { USERS_TABLE, UserSchema, Users }
