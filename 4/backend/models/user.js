'use strict';
const bcrypt = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.OrganizationNode)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name cannot be empty`
        },
        notEmpty: {
          msg: `Name cannot be empty`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Username is already used`
      },
      validate: {
        notNull: {
          msg: `Username cannot be empty`
        },
        notEmpty: {
          msg: `Username cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password cannot be empty`
        },
        notEmpty: {
          msg: `Password cannot be empty`
        },
        len: {
          args: [5],
          msg: `Minimum password is 5 character`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user =>{
    user.password = bcrypt.hashSync(user.password)
  })
  return User;
};