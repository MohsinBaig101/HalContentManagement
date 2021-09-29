const { DataTypes } = require('sequelize')
module.exports = (db) => {
  const TierSubscription = db.sequelize.define('TierSubscription', {
    // Model attributes are defined here

    tierId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inActive']
    }
  }, {
    modelName: 'TierSubscription',
    tableName: 'tiers_subscriptions'
  })
  return TierSubscription
}
