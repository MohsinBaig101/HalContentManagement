const db = require('../../config/connectDatabase')

const User = require('./User.modal')(db)
const userDetail = require('./userDetail.modal')(db)
const Role = require('./Role.modal')(db)
const Permission = require('./Permission.modal')(db)
const UserTier = require('./UserTier.modal')(db)
const TierSubscription = require('./TierSubscription.modal')(db)
const CreatorSetting = require('./CreatorSetting.modal')(db)

db.User = User
db.Role = Role
db.Permission = Permission
db.userDetail = userDetail
db.UserTier = UserTier
db.TierSubscription = TierSubscription
db.CreatorSetting = CreatorSetting

db.User.belongsTo(Role, {
  foreignKey: {
    name: 'role'
  }
})

db.userDetail.belongsTo(User)
db.User.hasOne(userDetail)

db.UserTier.belongsTo(User)
db.User.hasOne(UserTier)

UserTier.belongsToMany(User, {
  through: TierSubscription,
  as: 'users',
  foreignKey: 'tierId'
})

User.belongsToMany(UserTier, {
  through: TierSubscription,
  as: 'userTierSubscribe',
  foreignKey: 'userId'
})

module.exports = db
