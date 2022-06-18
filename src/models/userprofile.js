'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id' });
      UserProfile.hasOne(models.Jury, { as: 'jury', foreignKey: 'user_profile_id', sourceKey: 'id' });
      UserProfile.hasMany(models.Banner, { as: 'banners', foreignKey: 'user_profile_id', sourceKey: 'id' });
      UserProfile.hasMany(models.Blog, { as: 'blogs', foreignKey: 'user_profile_id', sourceKey: 'id' });
      UserProfile.hasMany(models.Gallery, { as: 'galleries', foreignKey: 'user_profile_id', sourceKey: 'id' });
    }
  }
  UserProfile.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
				model: 'Users',
				key: 'id'
			}
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};