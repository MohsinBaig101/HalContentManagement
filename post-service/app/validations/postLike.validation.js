const { body } = require('express-validator')
const validation = {
  validate: () => {
    return [
      body('react', 'Action is required').notEmpty().trim()
    ]
  }
}
module.exports = validation.validate
