const { User } = require('../models')
const bcrypt = require('bcrypt')
const roleService = require('./roleService')
const userService = require('../services/userService')
const appConfig = require('../../config/appConfig')
const userRepositry = require('../repositories/userRepositry')
module.exports = {
  createUser: async (data) => {
    const { email } = data
    const res = await userService.getGravatarAvatar(email)
    const roleId = await roleService.getRoleId('creator')
    const userObj = {
      ...data,
      roleId: roleId,
      profileObj: res
    }
    return await userRepositry.createUser(userObj)
  },
  verifyOTP: async (otp) => {
    const result = await userRepositry.getUserByEmailToken(otp)
    if (result) {
      if (result.emailVerified == 0) {
        await userRepositry.updateEmailTokenStatus(result.id)
        return {
          status: true,
          msg: 'Email Verified Successfully'
        }
      } else {
        return {
          status: false,
          msg: 'Email already Verified'
        }
      }
    } else {
      return {
        status: false,
        msg: 'Invalid OTP!'
      }
    }
  },
  verifyResetTokenOTP: async (otp, emailSendFlag) => {
    let result = await userRepositry.getUserByResetToken(otp)
    if (result) {
      if (emailSendFlag) {
        result = await userRepositry.updateResetToken(result.id)
      }
      return {
        status: true,
        data: result,
        msg: 'Reset Token Verified Successfully'
      }
    } else {
      return {
        status: false,
        msg: 'Invalid OTP!'
      }
    }
  },
  resetPassword: async (id, password) => {
    return await userRepositry.updatePassword(id, password)
  }
}
