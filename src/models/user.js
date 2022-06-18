'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserRole, { as: 'userRoles', foreignKey: 'user_id', sourceKey: 'id' });
		  User.hasOne(models.UserProfile, { as: 'userProfile', foreignKey: 'user_id', sourceKey: 'id' });
		
    }

    static validPassword(user, body) {
      return new Promise(function (resolve, reject) {
        if (typeof body.password !== 'string') {
          resolve(null)
        }        
        try {
          if (!user || user.get('hashed_password') === null || !(crypto.pbkdf2Sync(body.password, user['salt'], 1000, 64, `sha512`).toString(`hex`) === user['hashed_password'])) {
            resolve(null);
          }  
          resolve(user);  
        } catch (error) {
          resolve(null);
        }
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      set(value) {
				if (value !== null) {
          const salt = crypto.randomBytes(16).toString('hex');
          const hashed_password = crypto.pbkdf2Sync(value, salt, 1000, 64, `sha512`).toString(`hex`);
					this.setDataValue('salt', salt);
					this.setDataValue('hashed_password', hashed_password);
				}
			}
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verification_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};