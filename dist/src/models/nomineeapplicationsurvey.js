'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NomineeApplicationSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NomineeApplicationSurvey.belongsTo(models.NomineeApplication, { as: 'nomineeApplication', foreignKey: 'nominee_application_id', targetKey: 'id' });
      NomineeApplicationSurvey.belongsTo(models.AwardSurveyQuestion, { as: 'awardSurveyQuestion', foreignKey: 'award_survey_question_id', targetKey: 'id' });
      NomineeApplicationSurvey.belongsTo(models.AwardSurveyOption, { as: 'awardSurveyOption', foreignKey: 'award_survey_option_id', targetKey: 'id' });
    }
  }
  NomineeApplicationSurvey.init({
    nominee_application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NomineeApplications',
        key: 'id'
      }
    },
    award_survey_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSurveyQuestions',
        key: 'id'
      }
    },
    award_survey_option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSurveyOptions',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'NomineeApplicationSurvey'
  });
  return NomineeApplicationSurvey;
};