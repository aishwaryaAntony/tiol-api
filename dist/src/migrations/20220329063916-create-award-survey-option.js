'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AwardSurveyOptions', {
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
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      weightage: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('AwardSurveyOptions');
  }
};