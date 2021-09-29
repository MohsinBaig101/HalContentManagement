const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('email', 'Email is Required Field').notEmpty().isEmail().trim(),
      body('emailType', 'Email Type is Required Field').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
