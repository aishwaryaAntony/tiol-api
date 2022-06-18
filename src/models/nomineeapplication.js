'use strict';
const {
  Model
} = require('sequelize');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 16 });

module.exports = (sequelize, DataTypes) => {
  class NomineeApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NomineeApplication.belongsTo(models.UserProfile, { as: 'nomineeProfile', foreignKey: 'user_profile_ref', targetKey: 'id' });
      NomineeApplication.belongsTo(models.UserProfile, { as: 'nominatorProfile', foreignKey: 'nominator_ref', targetKey: 'id' });
      NomineeApplication.belongsTo(models.AwardSeason, { as: 'awardSeason', foreignKey: 'award_season_id', targetKey: 'id' });
      NomineeApplication.belongsTo(models.AwardSubCategory, { as: 'awardSubCategory', foreignKey: 'award_sub_category_id', targetKey: 'id' });
      NomineeApplication.hasOne(models.SelectedNominee, { as: 'selectedNominee', foreignKey: 'nominee_application_id', sourceKey: 'id' });
      NomineeApplication.hasMany(models.NomineeApplicationSurvey, { as: 'nomineeApplicationSurveys', foreignKey: 'nominee_application_id', sourceKey: 'id' });
    }
  }
  NomineeApplication.init({
    award_season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSeasons',
        key: 'id'
      }
    },
    application_sequence_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_profile_ref: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    },
    nominator_ref: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    },
    award_sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSubCategories',
        key: 'id'
      }
    },
    nominee_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nominee_contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postal_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    industry_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nominee_business: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'NomineeApplication',
    hooks: {
      afterCreate: (application, options) => {
        let application_sequence_number = uid();
        return application.update({
          application_sequence_number: application_sequence_number
        });
      }
    }
  });
  return NomineeApplication;
};