const { DataTypes } = require('sequelize')
module.exports = (db) => {
  const Post = db.sequelize.define('postTempMedia', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'postTempMedia',
    tableName: 'postsTempMedia'
  })
  return Post
}
