'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id', targetKey: 'id' });
      UserRole.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id' });
    }
  }
  UserRole.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false }
  }, {
    sequelize,
    modelName: 'UserRole'
  });
  return UserRole;
};