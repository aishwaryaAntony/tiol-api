'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardSurveyQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardSurveyQuestion.belongsTo(models.AwardSubCategory, { as: 'awardSubCategory', foreignKey: 'award_sub_category_id', targetKey: 'id' });
      AwardSurveyQuestion.hasMany(models.AwardSurveyOption, { as: 'awardSurveyOptions', foreignKey: 'award_survey_question_id', sourceKey: 'id'});
      AwardSurveyQuestion.hasMany(models.NomineeApplicationSurvey, { as: 'nomineeApplicationSurveys', foreignKey: 'award_survey_question_id', sourceKey: 'id'});
      AwardSurveyQuestion.hasMany(models.VoterSurvey, { as: 'voterSurveys', foreignKey: 'award_survey_question_id', sourceKey: 'id'});
    }
  }
  AwardSurveyQuestion.init({
    award_sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSubCategories',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
  }, {
    sequelize,
    modelName: 'AwardSurveyQuestion',
  });
  return AwardSurveyQuestion;
};