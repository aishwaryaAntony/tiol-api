'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyOption.belongsTo(models.SurveyQuestion, { as: 'surveyQuestion', foreignKey: 'survey_question_id', targetKey: 'id' });
    }
  }
  SurveyOption.init({
    survey_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SurveyQuestions',
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    weightage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SurveyOption'
  });
  return SurveyOption;
};