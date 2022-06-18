'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeasonWinners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      award_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      selected_nominee_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      award_sub_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      award_season_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      award_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nominee_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_weightage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_votes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      award_name: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SeasonWinners');
  }
};