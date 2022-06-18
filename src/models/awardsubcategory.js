'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardSubCategory.belongsTo(models.MasterSubCategory, { as: 'masterCategory', foreignKey: 'master_sub_category_ref', targetKey: 'id' });
      AwardSubCategory.belongsTo(models.AwardSeason, { as: 'awardSeason', foreignKey: 'award_season_id', targetKey: 'id' });
      AwardSubCategory.belongsTo(models.AwardCategory, { as: 'awardCategory', foreignKey: 'award_category_id', targetKey: 'id' });
      AwardSubCategory.hasMany(models.AwardSurveyQuestion, { as: 'awardSurveyQuestions', foreignKey: 'award_sub_category_id', sourceKey: 'id' });
      AwardSubCategory.hasMany(models.NomineeApplication, { as: 'nomineeApplications', foreignKey: 'award_sub_category_id', sourceKey: 'id' });
      AwardSubCategory.hasMany(models.SelectedNominee, { as: 'selectedNominees', foreignKey: 'award_sub_category_id', sourceKey: 'id' });
      AwardSubCategory.hasMany(models.Voter, { as: 'voters', foreignKey: 'award_sub_category_id', sourceKey: 'id' });
      AwardSubCategory.hasMany(models.SeasonWinner, { as: 'awardSeasonWinnerSubCategories', foreignKey: 'award_sub_category_id', sourceKey: 'id' });
    }
  }
  AwardSubCategory.init({
    master_sub_category_ref: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MasterCategories',
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
    award_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardCategories',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'AwardSubCategory',
  });
  return AwardSubCategory;
};