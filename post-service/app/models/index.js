const db = require('../../config/connectDatabase')

const post = require('./post.modal')(db)
const postComment = require('./postComments.modal')(db)
const mediaLike = require('./mediaLikes.modal')(db)
const User = require('./User.modal')(db)
const PostTempMedia = require('./postTempMedia.modal')(db)
const PostTier = require('./postTiers.modal')(db)
const TierSubscription = require('./TierSubscription.modal')(db)
// const UserTier = require('./UserTier.modal')(db)

// db.UserTier = UserTier
db.PostTier = PostTier
db.Post = post
db.User = User
db.PostTempMedia = PostTempMedia
db.PostComment = postComment
db.MediaLike = mediaLike
db.TierSubscription = TierSubscription

db.sequelize.models.Post.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
})
db.Post.hasMany(postComment, {
  foreignKey: {
    name: 'postId'
  }
})
db.User.hasMany(postComment, {
  foreignKey: {
    name: 'userId'
  }
})
db.PostComment.belongsTo(db.Post, {
  foreignKey: {
    name: 'postId'
  }
})
db.PostComment.belongsTo(db.User, {
  foreignKey: {
    name: 'userId'
  }
})
db.MediaLike.belongsTo(db.User, {
  foreignKey: {
    name: 'userId'
  }
})

db.Post.hasMany(PostTier, {
  foreignKey: {
    name: 'postId'
  }
})
db.PostTier.hasMany(TierSubscription, {
  foreignKey: {
    name: 'tierId'
  },
  constraints: false,
  targetKey :'tierId'
})

module.exports = db
