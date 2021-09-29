const { Sequelize, DataTypes } = require('sequelize')
module.exports = (db) => {
  const userDetail = db.sequelize.define('userDetail', {
    pageName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coverPhoto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pageURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    introVideo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    introVideoType:{
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    modelName: 'userDetail',
    tableName: 'userDetails'
  })

  return userDetail
}
