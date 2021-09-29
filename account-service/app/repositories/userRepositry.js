const { User } = require('../models')
const bcrypt = require('bcrypt')
const appConfig = require('../../config/appConfig')
const { Op } = require('sequelize')

module.exports = {
  createUser: async (data) => {
    const { firstName, lastName, email, phone, password, profileObj, roleId } = data
    return await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      phone: phone,
      status: 'pending',
      profilePic: profileObj.status === true ? profileObj.url : appConfig.DEFAULT_PROFILE,
      role: roleId,
      emailToken: helper.randomString(6)
    })
  },
  getUserByEmailToken: async (token) => {
    return await User.findOne({
      where: {
        emailToken: token
      }
    })
  },
  updateEmailTokenStatus: async (id) => {
    const user = await User.findOne({
      where: { id: id }
    })
    user.emailVerified = 1
    user.status = 'active'
    return await user.save()
  },
  getUserByResetToken: async (token) => {
    return await User.findOne({
      where: {
        resetToken: token
      }
    })
  },
  updateResetToken: async (id) => {
    const user = await User.findOne({
      where: { id: id }
    })
    user.resetToken = helper.randomString(6)
    return await user.save()
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email: email } })
  },
  updatePassword: async (id, password) => {
    return await User.update(
      { password: await bcrypt.hash(password, 10) },
      { where: { id: id } }
    )
  }
}
