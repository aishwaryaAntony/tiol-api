'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gallery.belongsTo(models.UserProfile, { as: 'userProfile', foreignKey: 'user_profile_id', targetKey: 'id'});
      Gallery.hasMany(models.GalleryAttachment, { as: 'galleryAttachments', foreignKey: 'gallery_id', sourceKey: 'id'});
    }
  }
  Gallery.init({
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserProfiles",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};