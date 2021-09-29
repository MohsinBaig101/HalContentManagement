const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (db) => {
  const MediaLikes = db.sequelize.define('mediaLikes', {
    objectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    objectType: {
      type: DataTypes.ENUM('post', 'comment'),
      allowNull: false,
      defaultValue: 'post'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    like: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: false,
      defaultValue: 'like'
    }
  }, {
    modelName: 'mediaLikes',
    tableName: 'mediaLikes'
  })
  return MediaLikes
}
