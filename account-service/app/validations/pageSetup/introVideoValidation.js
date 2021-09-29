const { body } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('introVideo').custom((value, { req }) => {
        if (req.file) {
          return true
        } else {
          throw new Error('Intro Video is Required')
        }
      })
    ]
  }
}
module.exports = validation.validate
