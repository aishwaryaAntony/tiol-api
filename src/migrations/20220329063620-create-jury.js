'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Juries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      priority: { 
        type: Sequelize.INTEGER,
        allowNull: false
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mongo_id: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Juries');
  }
};