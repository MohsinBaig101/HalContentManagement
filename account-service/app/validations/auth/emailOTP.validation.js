const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('otp', 'OTP is Required Field').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
