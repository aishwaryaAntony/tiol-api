'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoterSurveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      award_survey_question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      voter_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      award_survey_option_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VoterSurveys');
  }
};