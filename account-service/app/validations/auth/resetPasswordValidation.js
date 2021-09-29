const { body, validationResult, check } = require('express-validator')
const { User } = require('../../models')
const validation = {
  validate: () => {
    return [
      body('token', 'Token is Required Field').notEmpty().trim(),
      body('password', 'Password is Required Field').notEmpty().trim(),
      body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true
      })

    ]
  }
}
module.exports = validation.validate
