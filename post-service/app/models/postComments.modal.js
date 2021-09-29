const { Sequelize, DataTypes } = require('sequelize')
module.exports = (db) => {
  const PostComments = db.sequelize.define('postComments', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    modelName: 'postComments',
    tableName: 'postComments'
  })
  return PostComments
}
