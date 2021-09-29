const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const { Role } = require('../models')
module.exports = (db) => {
  const User = db.accountDB.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailToken: {
      type: DataTypes.STRING
    },
    resetToken: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.INTEGER
    }
  }, {
    modelName: 'User',
    tableName: 'users',
    schema: 'account'
  })

  return User
}
