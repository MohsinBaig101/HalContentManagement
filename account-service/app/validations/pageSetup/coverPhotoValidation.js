const { body } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('coverPhoto').custom((value, { req }) => {
        if (req.file) {
          return true
        } else {
          throw new Error('Cover Photo is Required Field')
        }
      })
    ]
  }
}
module.exports = validation.validate
