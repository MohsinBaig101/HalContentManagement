const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (db) => {
  const PostTier = db.sequelize.define('postTier', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'PostTier',
    tableName: 'postTiers'
  })
  return PostTier
}
