const authService = require('../../services/authService')
const fetch = require('node-fetch')
const userResponse = require('../../Resources/user.response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userService = require('../../services/userService')
const userRepositry = require('../../repositories/userRepositry')
const emailTemplateService = require('../../../externalServices/emailTemplateService')
module.exports = {
  /** Creator Registration */
  login: async (req, res, next) => {
    try {
      const user = await userService.getUserByEmail(req.body.email)
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            if (user.status == 'pending') {
              return helper.apiResponse(req, res, 'OK', true, null, 'Email is not verified')
            }
            jwt.sign({ loggedInUser: user }, process.env.TOKEN_SECRET, { algorithm: 'HS256' }, function (err, token) {
              const data = {
                token: token,
                user: userResponse(user)
              }
              const message = 'Login Successfully'
              return helper.apiResponse(req, res, 'OK', false, data, message)
            })
          } else {
            const message = 'Invalid Credentials'
            return helper.apiResponse(req, res, 'OK', true, null, message)
          }
        })
      } else {
        const message = 'Invalid Credentials'
        return helper.apiResponse(req, res, 'OK', true, null, message)
      }
    } catch (error) {
      const message = 'Invalid Credentials'
      return helper.apiResponse(req, res, 'OK', true, null, message)
    }
  },
  register: async (req, res, next) => {
    const data = req.body
    try {
      const result = await authService.createUser(data)
      emailTemplateService.registerUserEmail(result)
      return helper.apiResponse(req, res, 'CREATED', false, userResponse(result), 'Please Verify your email address')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  emailOTPVerification: async (req, res, next) => {
    const otp = req.body.otp
    try {
      const result = await authService.verifyOTP(otp)
      if (result && result.status === true) {
        return helper.apiResponse(req, res, 'OK', false, null, result.msg)
      } else if (result && result.status === false) {
        return helper.apiResponse(req, res, 'OK', true, null, result.msg)
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  forgotPassword: async (req, res, next) => {
    const email = req.body.email
    try {
      const user = await userService.getUserByEmail(email)
      if (user) {
        const updatedObj = await userRepositry.updateResetToken(user.id)
        emailTemplateService.forgotPasswordEmail(updatedObj)
        return helper.apiResponse(req, res, 'OK', false, null, 'Password Reset email sent')
      } else {
        return helper.apiResponse(req, res, 'OK', true, null, 'Email not exist in our record')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  resetTokenOTPVerification: async (req, res, next) => {
    const otp = req.body.otp
    const emailSendFlag = req.body.sendEmail
    try {
      const result = await authService.verifyResetTokenOTP(otp, emailSendFlag)
      if (result && result.status === true) {
        if (emailSendFlag) {
          emailTemplateService.resetTokenEmail(result)
        }
        return helper.apiResponse(req, res, 'OK', false, { email: result.data.email || null }, result.msg)
      } else if (result && result.status === false) {
        return helper.apiResponse(req, res, 'OK', true, null, result.msg)
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  resendEmail: async (req, res, next) => {
    const emailType = req.body.emailType
    const email = req.body.email
    const userObj = await userService.getUserByEmail(email)
    if (userObj) {
      if (emailType === 'register') {
        await userObj.update({
          emailToken: helper.randomString(6),
          emailVerified: 0,
          status: 'pending'
        })
        emailTemplateService.registerUserEmail(userObj)
      }
      if (emailType === 'forgot') {
        await userObj.update({
          resetToken: helper.randomString(6)
        })
        emailTemplateService.forgotPasswordEmail(userObj)
      }
      if (emailType === 'resetTokenOTP') {
        await userObj.update({
          resetToken: helper.randomString(6)
        })
        emailTemplateService.resetTokenEmail({ data: userObj })
      }
      return helper.apiResponse(req, res, 'OK', false, null, 'Email sent successfully')
    } else {
      return helper.apiResponse(req, res, 'OK', true, null, 'Email not exist in our record')
    }
  },
  resetPassword: async (req, res, next) => {
    const token = req.body.token
    const password = req.body.password
    try {
      const user = await userRepositry.getUserByResetToken(token)
      if (user) {
        await authService.resetPassword(user.id, password)
        return helper.apiResponse(req, res, 'OK', false, null, 'Password Reset Successfully')
      } else {
        return helper.apiResponse(req, res, 'OK', true, null, 'OTP is Invalid')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }
}
