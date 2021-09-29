const express = require('express')
const router = express.Router()
const validateRequest = require('../helpers/validateRequest')
const authController = require('../controllers/Auth/authController')
const validationRegister = require('../validations/auth/register.validation')
const validationEmailOTP = require('../validations/auth/emailOTP.validation')
const validationLogin = require('../validations/auth/login.validation')
const validationForgotPassword = require('../validations/auth/forgot-password.validation')
const resendEmailValidation = require('../validations/auth/resendEmail.validation')
const resetPasswordValidation = require('../validations/auth/resetPasswordValidation')
router.post('/register', [validationRegister()], validateRequest, authController.register)
router.post('/forgot-password', [validationForgotPassword()], validateRequest, authController.forgotPassword)
router.post('/login', [validationLogin()], validateRequest, authController.login)
router.post('/verify-email-otp', [validationEmailOTP()], validateRequest, authController.emailOTPVerification)
router.post('/verify-reset-token-otp', [validationEmailOTP()], validateRequest, authController.resetTokenOTPVerification)
router.post('/resend-email', [resendEmailValidation()], validateRequest, authController.resendEmail)
router.post('/reset-password', [resetPasswordValidation()], validateRequest, authController.resetPassword)
module.exports = {
  router: router,
  basePath: 'auth'
}
