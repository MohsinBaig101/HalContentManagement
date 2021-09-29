const { body } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('currentPassword').notEmpty().trim(),
      body('newPassword').notEmpty().trim(),
      body('newConfirmPassword').notEmpty().trim().custom((val, { req }) => {
        if (val !== req.body.newPassword) {
          throw new Error('New Password and Confirm Password didn\'t matched')
        }
        return true
      })
    ]
  }
}
module.exports = validation.validate
