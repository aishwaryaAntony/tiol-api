'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyQuestion.belongsTo(models.MasterSubCategory, { as: 'masterSubCategory', foreignKey: 'master_sub_category_id', targetKey: 'id' });
      SurveyQuestion.hasMany( models.SurveyOption, { as: 'surveyOptions', foreignKey: 'survey_question_id', sourceKey: 'id'})
    }
  }
  SurveyQuestion.init({
    master_sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MasterSubCategories',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    weightage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SurveyQuestion',
  });
  return SurveyQuestion;
};