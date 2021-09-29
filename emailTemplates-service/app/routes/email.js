const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')
router.post('/register/email-send', emailController.sendRegisterEmail)
router.post('/reset-password/email-send', emailController.sendResetEmail)
router.post('/reset-password/email-send-otp', emailController.sendResetEmailOTP)
router.get('/test', function (req, res, next) {
  return res.json({
    status: true
  })
})

module.exports = {
  router: router,
  basePath: '/api'
}
