const { body } = require('express-validator')
const { userDetail } = require('../../models')
const validation = {
  validate: () => {
    return [
      body('pageName', 'Page Name is Required Field').notEmpty().trim(),
      body('description', 'description is Required Field').notEmpty().trim(),
      body('pageURL', 'Page URL is Required Field').notEmpty().trim(),
      body('about', 'About is Required Field').notEmpty().trim(),
      body('coverPhoto', 'Cover Photo is Required field').notEmpty().trim().custom(value => {
        if (value) {
          return userDetail.findOne({ where: { coverPhoto: value } }).then(userDetailObj => {
            if (userDetailObj) {
              return true
            }
            throw new Error('Cover Photo value is Incorrect')
          })
        }
        throw new Error('Cover Photo is Required field')
      })
    ]
  }
}
module.exports = validation.validate
