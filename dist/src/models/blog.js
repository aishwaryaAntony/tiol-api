'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.UserProfile, { as: 'userProfile', foreignKey: 'user_profile_id', targetKey: 'id' });
    }
  }
  Blog.init({
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        models: 'UserProfiles',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blog_creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    file_name: {
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
    }
  }, {
    sequelize,
    modelName: 'Blog'
  });
  return Blog;
};