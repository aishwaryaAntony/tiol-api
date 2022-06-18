'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashed_password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verification_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  }
};