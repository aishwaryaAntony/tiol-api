'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MasterCategory.hasMany(models.MasterSubCategory, { as: 'masterSubCategories', foreignKey: 'master_category_id', sourceKey: 'id' })
      MasterCategory.hasMany(models.AwardCategory, { as: 'awardCategories', foreignKey: 'master_category_ref', sourceKey: 'id' });
    }
  }
  MasterCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    modelName: 'MasterCategory',
  });
  return MasterCategory;
};