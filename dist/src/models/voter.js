'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voter.belongsTo(models.SelectedNominee, { as: 'selectedNominee', foreignKey: 'selected_nominee_id', targetKey: 'id' });
      Voter.belongsTo(models.AwardSubCategory, { as: 'awardSubCategory', foreignKey: 'award_sub_category_id', targetKey: 'id' });
      Voter.hasMany(models.VoterSurvey, { as: 'voterSurveys', foreignKey: 'voter_id', sourceKey: 'id' });
    }
  }
  Voter.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Voter'
  });
  return Voter;
};