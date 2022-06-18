'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AwardCategory.belongsTo(models.MasterCategory, { as: 'masterCategory', foreignKey: 'master_category_ref', targetKey: 'id' });
      AwardCategory.belongsTo(models.AwardSeason, { as: 'awardSeason', foreignKey: 'award_season_id', targetKey: 'id' });
      AwardCategory.hasMany(models.AwardSubCategory, { as: 'awardSubCategories', foreignKey: 'award_category_id', sourceKey: 'id' });
    }
  }
  AwardCategory.init({
    master_category_ref: {
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
    }
  }, {
    sequelize,
    modelName: 'AwardCategory'
  });
  return AwardCategory;
};