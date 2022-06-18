'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NomineeApplications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      award_season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AwardSeasons',
          key: 'id'
        }
      },
      application_sequence_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_profile_ref: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'UserProfiles',
          key: 'id'
        }
      },
      nominator_ref: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserProfiles',
          key: 'id'
        }
      },
      award_sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AwardSubCategories',
          key: 'id'
        }
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
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('NomineeApplications');
  }
};