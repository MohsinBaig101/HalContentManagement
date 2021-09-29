const { Sequelize, DataTypes } = require('sequelize')
module.exports = (db) => {
  const Permission = db.sequelize.define('Permission', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'Permission',
    tableName: 'permissions'
  })
  return Permission
}
