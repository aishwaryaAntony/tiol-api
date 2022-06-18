'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GalleryAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GalleryAttachment.belongsTo(models.Gallery, { as: 'gallery', foreignKey: 'gallery_id', targetKey: 'id'});
    }
  }
  GalleryAttachment.init({
    gallery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Galleries',
        key: 'id'
      }
    },
    attachment_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attachment_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_image:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    mongo_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'GalleryAttachment',
  });
  return GalleryAttachment;
};