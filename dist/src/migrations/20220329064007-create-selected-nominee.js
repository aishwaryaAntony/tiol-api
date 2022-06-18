'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SelectedNominees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nominator_ref: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nominee_application_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      award_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      award_season_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nominee_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nominee_contact_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_weightage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_votes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pan_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postal_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pin_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      industry_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nominee_business: {
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
    await queryInterface.dropTable('SelectedNominees');
  }
};