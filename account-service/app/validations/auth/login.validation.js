const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('email', 'Email is Required Field').notEmpty().isEmail().trim(),
      body('password', 'Password is Required Field').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
