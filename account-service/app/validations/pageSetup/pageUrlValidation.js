const { body } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('pageUrl').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
