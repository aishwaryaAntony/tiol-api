'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.UserProfile, { as: 'userProfile', foreignKey: 'user_profile_id', targetKey: 'id' })
    }
  }
  Banner.init({
    banner_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    },
    attachment_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mongo_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};