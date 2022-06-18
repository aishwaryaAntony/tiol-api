'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoterSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoterSurvey.belongsTo(models.AwardSurveyQuestion, { as: 'awardSurveyQuestion', foreignKey: 'award_survey_question_id', targetKey: 'id' });
      VoterSurvey.belongsTo(models.Voter, { as: 'voter', foreignKey: 'voter_id', targetKey: 'id' });
      VoterSurvey.belongsTo(models.AwardSurveyOption, { as: 'awardSurveyOption', foreignKey: 'award_survey_option_id', targetKey: 'id' });
    }
  }
  VoterSurvey.init({
    award_survey_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSurveyQuestions',
        key: 'id'
      }
    },
    voter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Voters',
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
    modelName: 'VoterSurvey',
  });
  return VoterSurvey;
};