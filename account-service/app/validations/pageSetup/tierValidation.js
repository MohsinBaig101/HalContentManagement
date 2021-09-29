const { body } = require('express-validator')
const { userDetail } = require('../../models')
const _ = require('lodash')
const validation = {
  validate: () => {
    return [
      body('title', 'Title is Required Field').notEmpty().trim(),
      body('price', 'Price is Required Field').notEmpty().isNumeric().trim(),
      body('benefits', 'Benefits is Required Field').custom((val, { req }) => {
        if (_.isArray(val) && val.length > 0) {
          return true
        } else {
          return false
        }
      }),
      body('description', 'Description is Required Field').notEmpty().trim(),
      body('status', 'Status is Required Field').notEmpty().trim(),
      body('tierImage', 'Tier Image is Required field').custom((val, { req }) => {
        // if(req.file || req.body.filename){
        //     return true
        // }else{
        //     return false
        // }
        return true
      })
    ]
  }
}
module.exports = validation.validate
