const { Sequelize, DataTypes } = require('sequelize')
module.exports = (db) => {
  const Role = db.sequelize.define('Role', {
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
    modelName: 'Role',
    tableName: 'roles'
  })
  return Role
}
