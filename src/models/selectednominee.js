'use strict';
const {
  Model
} = require('sequelize');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 32 });
module.exports = (sequelize, DataTypes) => {
  class SelectedNominee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SelectedNominee.belongsTo(models.UserProfile, { as: 'userProfile', foreignKey: 'user_profile_id', targetKey: 'id' });
      SelectedNominee.belongsTo(models.UserProfile, { as: 'nominatorProfile', foreignKey: 'nominator_ref', targetKey: 'id' });
      SelectedNominee.belongsTo(models.NomineeApplication, { as: 'nomineeApplication', foreignKey: 'nominee_application_id', targetKey: 'id' });
      SelectedNominee.belongsTo(models.AwardSubCategory, { as: 'awardSubCategory', foreignKey: 'award_sub_category_id', targetKey: 'id' });
      SelectedNominee.belongsTo(models.AwardSeason, { as: 'awardSeason', foreignKey: 'award_season_id', targetKey: 'id' });
      SelectedNominee.hasMany(models.Voter, { as: 'voters', foreignKey: 'selected_nominee_id', sourceKey: 'id' });
      SelectedNominee.hasMany(models.SeasonWinner, { as: 'SeasonNomineeWinner', foreignKey: 'selected_nominee_id', sourceKey: 'id' });
    }
  }
  SelectedNominee.init({
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    },
    nomination_unique_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nominator_ref: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    },
    nominee_application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NomineeApplications',
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
    award_season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSeasons',
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
    total_weightage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_votes: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    modelName: 'SelectedNominee',
    hooks: {
      afterCreate: (selectedNominee, options) => {
        let nomination_unique_id = uid();
        return selectedNominee.update({
          nomination_unique_id: nomination_unique_id
        });
      }
    }
  });
  return SelectedNominee;
};