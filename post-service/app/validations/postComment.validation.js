const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('comment', 'Comment is required field').notEmpty().trim(),
      body('postId', 'Post Id is required field').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
