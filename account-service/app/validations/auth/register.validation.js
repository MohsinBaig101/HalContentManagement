const { body, validationResult, check } = require('express-validator')
const { User } = require('../../models')
const validation = {
  validate: () => {
    return [
      body('firstName', 'First Name is Required Field').notEmpty().trim(),
      body('lastName', 'Last Name is Required Field').notEmpty().trim(),
      body('password', 'Password is Required Field').notEmpty().trim(),
      body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true
      }),
      body('phone', 'Phone is required field').notEmpty().trim().custom(value => {
        if (value) {
          return User.findOne({ where: { phone: value } }).then(user => {
            if (user) {
              return Promise.reject('Phone already in use')
            }
            return true
          })
        }
        return false
      }),
      body('email', 'Email is required field').notEmpty().trim().custom(value => {
        if (value) {
          return User.findOne({ where: { email: value } }).then(user => {
            if (user) {
              return Promise.reject('Email already in use')
            }
            return true
          })
        }
        return false
      })

    ]
  }
}
module.exports = validation.validate
