const { validationResult } = require('express-validator')
module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, errors.array(), 'Validation Error')
    }
    next()
  } catch (err) {
    return helper.apiResponse(req, res, 'VALIDATION_ERR', true, err, 'Validation Error')
  }
}
