'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banner_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      attachment_name: {
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
    await queryInterface.dropTable('Banners');
  }
};