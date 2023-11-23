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
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

// Thanks to Model we can access methods like find
// Static methods allows to access them without having a declaration
class Users extends Model {
  static associate() {
    // relations to models
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
