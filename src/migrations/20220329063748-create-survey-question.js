'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SurveyQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      master_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterSubCategories',
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('SurveyQuestions');
  }
};