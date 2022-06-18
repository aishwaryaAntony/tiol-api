'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardSeason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardSeason.hasMany(models.AwardCategory, { as: 'awardCategories', foreignKey: 'award_season_id', sourceKey: 'id'});
      AwardSeason.hasMany(models.AwardSubCategory, { as: 'awardSubCategories', foreignKey: 'award_season_id', sourceKey: 'id'});
      AwardSeason.hasMany(models.NomineeApplication, { as: 'nomineeApplications', foreignKey: 'award_season_id', sourceKey: 'id'});
      AwardSeason.hasMany(models.SelectedNominee, { as: 'selectedNominees', foreignKey: 'award_season_id', sourceKey: 'id'});   
      AwardSeason.hasMany(models.SeasonWinner, { as: 'awardSeasonWinners', foreignKey: 'award_season_id', sourceKey: 'id'});   
    }
  }
  AwardSeason.init({
    code:{
      type: DataTypes.STRING,
      allowNull: false
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AwardSeason',
  });
  return AwardSeason;
};