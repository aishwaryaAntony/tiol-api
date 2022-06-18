'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeasonWinner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SeasonWinner.belongsTo(models.AwardSeason, { as: 'awardSeason', foreignKey: 'award_season_id', targetKey: 'id' });
      SeasonWinner.belongsTo(models.AwardCategory, { as: 'awardCategory', foreignKey: 'award_category_id', targetKey: 'id' });
      SeasonWinner.belongsTo(models.AwardSubCategory, { as: 'awardSubCategory', foreignKey: 'award_sub_category_id', targetKey: 'id' });
      SeasonWinner.belongsTo(models.Award, { as: 'award', foreignKey: 'award_id', targetKey: 'id' });
      SeasonWinner.belongsTo(models.SelectedNominee, { as: 'selectedNominee', foreignKey: 'selected_nominee_id', targetKey: 'id' });

    }
  }
  SeasonWinner.init({
    award_season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardSeasons',
        key: 'id'
      }
    },
    award_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Awards',
        key: 'id'
      }
    },
    selected_nominee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SelectedNominees',
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
    award_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AwardCategories',
        key: 'id'
      }
    },
    nominee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_weightage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_votes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    award_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SeasonWinner',
  });
  return SeasonWinner;
};