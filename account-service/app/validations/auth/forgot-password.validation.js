const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('email', 'Email is Required Field').notEmpty().isEmail().trim()
    ]
  }
}
module.exports = validation.validate
