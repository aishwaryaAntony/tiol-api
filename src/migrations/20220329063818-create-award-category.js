'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AwardCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      master_category_ref: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      award_season_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },      
      nomination_start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      nomination_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      voting_start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      voting_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('AwardCategories');
  }
};