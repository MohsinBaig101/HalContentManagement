const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (db) => {
  const Post = db.sequelize.define('Post', {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    teaserText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attributes: {
      type: DataTypes.JSON,
      allowNull: true
    },
    accessRules: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    modelName: 'Post',
    tableName: 'posts'
  })
  return Post
}
