const { body } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('profileImg').custom((value, { req }) => {
        if (req.file) {
          return true
        } else {
          throw new Error('Profile Image is Required Field')
        }
      })
    ]
  }
}
module.exports = validation.validate
