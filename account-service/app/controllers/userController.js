const bcrypt = require('bcrypt')
const userService = require('../services/userService')
module.exports = {
  // Retrieve and return records from the database.
  /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
  uploadProfilePicture: async (req, res, next) => {
    const fileName = req.file.key
    try {
      const result = await userService.updateProfilePicURL(fileName, req.user.id)
      return helper.apiResponse(req, res, 'CREATED', false, result, 'Profile Picture Update successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  userBasicInfoSave: async (req, res, next) => {
    const data = {
      pageName: req.body.pageName,
      pageURL: req.body.pageURL,
      description: req.body.description,
      about: req.body.about,
      userId: req.user.id,
      introVideo: req.body.introVideo,
      introVideoType: req.body.introVideoType,
    }

    try {
      const userDetailSaved = await userService.saveUserDetails(data)
      if (userDetailSaved && userDetailSaved.status) {
        return helper.apiResponse(req, res, 'CREATED', false, null, 'Record saved successfully')
      }
      throw new Error('Internal server error!')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  uniquePageUrl: async (req, res) => {
    const pageUrl = req.body.pageUrl;
    if(pageUrl === ''){
      return helper.apiResponse(req, res, 'OK', true, { status: 3 }, 'Page URL is required')
    }
    try {
      const isExist = await userService.pageUrlExist(pageUrl, req.user.id);
      if (isExist) {
        return helper.apiResponse(req, res, 'OK', true, { status: 2 }, 'Page Url already taken')
      } else {
        return helper.apiResponse(req, res, 'OK', false, { status: 1 }, 'Page Url already not taken')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  covorPhotoUpload: async (req, res, next) => {
    // debugger;
    const fileName = req.file.key
    try {
      const coverPhotoRes = await userService.updateCoverPhoto(fileName, req.user.id)
      return helper.apiResponse(req, res, 'CREATED', false, coverPhotoRes, 'Cover Photo Upload successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  introVideoUpload: async (req, res, next) => {
    const fileName = req.file.key
    try {
      const result = await userService.introVideoUpload(fileName, req.user.id)
      return helper.apiResponse(req, res, 'CREATED', false, result, 'Intro video Upload successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getUserBasicInfo: async (req, res, next) => {
    try {
      const userObj = await userService.getUserBasicInfo(req.user.id)
      return helper.apiResponse(req, res, 'OK', false, userObj, 'User Details Fetched Successfuly')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const user = await userService.getUserByEmail(req.user.email)
      bcrypt.compare(req.body.currentPassword, user.password, async (err, result) => {
        if (result) {
          await userService.updatePassword(req.user.id, req.body.newPassword)
          return helper.apiResponse(req, res, 'OK', false, null, 'Password Update Successfully')
        } else {
          const message = 'Current Password Incorrect'
          return helper.apiResponse(req, res, 'OK', true, null, message)
        }
      })
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getCreatorPublicProfile: async (req, res, next) => {
    const pageUrl = req.params.pageUrlName
    try {
      const result = await userService.getCreatorProfile(pageUrl)
      if (result.status === 'ok') {
        const data = {
          tiers: result.tiers,
          user: result.user
        }
        return helper.apiResponse(req, res, 'OK', false, data, 'Detail Fetched Successfully')
      }
      return helper.apiResponse(req, res, 'OK', true, null, 'Something went wrong')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  removeMediaVideo: async (req, res) => {
    const key = req.body.introVideo
    try{
    await userService.removeMediaVideo(key,req.user.id)
    return helper.apiResponse(req, res, 'CREATED', false, null, 'Media Removed successfully')
    }catch(err){
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }

}
