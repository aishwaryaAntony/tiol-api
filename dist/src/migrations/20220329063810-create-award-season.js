'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AwardSeasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
      event_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('AwardSeasons');
  }
};