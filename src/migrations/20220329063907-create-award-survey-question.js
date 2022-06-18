'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AwardSurveyQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      award_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AwardSubCategories',
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      weightage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('AwardSurveyQuestions');
  }
};