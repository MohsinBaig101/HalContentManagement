const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('fileKey', 'fileKey is Required Field').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
