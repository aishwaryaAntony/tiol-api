'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MasterSubCategory.belongsTo(models.MasterCategory, { as: 'masterCategory', foreignKey: 'master_category_id', targetKey: 'id' });
      MasterSubCategory.hasMany(models.SurveyQuestion, { as: 'surveyQuestions', foreignKey:'master_sub_category_id', sourceKey: 'id' });
      MasterSubCategory.hasMany(models.AwardSubCategory, { as: 'awardSubCategories', foreignKey:'master_sub_category_ref', sourceKey: 'id' });
    }
  }
  MasterSubCategory.init({
    master_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MasterCategories',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    modelName: 'MasterSubCategory',
  });
  return MasterSubCategory;
};