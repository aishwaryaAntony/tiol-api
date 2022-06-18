'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardSurveyOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardSurveyOption.belongsTo(models.AwardSurveyQuestion, { as: 'awardSurveyQuestion', foreignKey: 'award_survey_question_id', targetKey: 'id' });
      AwardSurveyOption.hasMany(models.NomineeApplicationSurvey, { as: 'nomineeApplicationSurveys', foreignKey: 'award_survey_option_id', sourceKey: 'id' });
      AwardSurveyOption.hasMany(models.VoterSurvey, { as: 'voterSurveys', foreignKey: 'award_survey_option_id', sourceKey: 'id' });
    }
  }
  AwardSurveyOption.init({
    award_survey_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'AwardSurveyOption'
  });
  return AwardSurveyOption;
};