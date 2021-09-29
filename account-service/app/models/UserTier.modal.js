const { DataTypes } = require('sequelize')
module.exports = (db) => {
  const UserTier = db.sequelize.define('UserTier', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inActive']
    },
    benefits: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    modelName: 'UserTier',
    tableName: 'userTiers'
  })

  return UserTier
}
