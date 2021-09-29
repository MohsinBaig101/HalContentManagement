const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const tierController = require('../controllers/tierController')
const { authenticate } = require('../middleware/auth')
const { profileImageFilter, videoFilter } = require('../../utils/fileFilters/filters')
const profileImageValidation = require('../validations/profileImageValidation')
const coverPhotoValidation = require('../validations/pageSetup/coverPhotoValidation')
const introVideoValidation = require('../validations/pageSetup/introVideoValidation')
const userBasicInfoValidation = require('../validations/pageSetup/userBasicInfoValidation')
const pageUrlValidation = require('../validations/pageSetup/pageUrlValidation')
const tierValidation = require('../validations/pageSetup/tierValidation')
const tierSubscriptionValidation = require('../validations/tierSubscriptionValidation')
const changePasswordValidation = require('../validations/changePasswordValidation')
const { s3Bucket } = require('../../utils/s3Bucket')

const videoUpload = s3Bucket.upload(videoFilter).single('introVideo')
const profileImgUpload = s3Bucket.upload(profileImageFilter).single('profileImg')
const covorPhotoUpload = s3Bucket.upload(profileImageFilter).single('coverPhoto')
const tierImageUpload = s3Bucket.upload(profileImageFilter).single('tierImage')

router.post('/upload-profile', authenticate,
  function (req, res, next) {
    profileImgUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Image are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , [profileImageValidation()], helper.validateRequest, UserController.uploadProfilePicture)
router.put('/change-password', authenticate, [changePasswordValidation()], helper.validateRequest, UserController.changePassword)

router.post('/upload-cover-photo', authenticate,
  function (req, res, next) {
    covorPhotoUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Image are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , [coverPhotoValidation()], helper.validateRequest, UserController.covorPhotoUpload)
router.post('/upload-introVideo', authenticate,
  function (req, res, next) {
    videoUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Video file are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , [introVideoValidation()], helper.validateRequest, UserController.introVideoUpload)
router.post('/updateBasicInfo', authenticate, [userBasicInfoValidation()], helper.validateRequest, UserController.userBasicInfoSave)
router.post('/unique-page-url', authenticate, [pageUrlValidation()], helper.validateRequest, UserController.uniquePageUrl)
router.post('/remove-media-video',authenticate,UserController.removeMediaVideo)
router.post('/tiers/create', authenticate,
  function (req, res, next) {
    tierImageUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Image are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , [tierValidation()], helper.validateRequest, tierController.createTier)
router.get('/tiers/get', authenticate, tierController.getTiers)
router.get('/tiers/get/:id', authenticate, tierController.getTierById)
router.put('/tiers/update', authenticate,
  function (req, res, next) {
    tierImageUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Image are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , [tierValidation()], helper.validateRequest, tierController.updateTier)

router.post('/tiers/subscribe', authenticate, [tierSubscriptionValidation()], helper.validateRequest, tierController.tierSubscription)
router.get('/tiers/subscribed/all', authenticate, tierController.getSubscibedTiers)
router.post('/tiers/fanSubscribedCreatorTiers', authenticate, tierController.fanSubscribedCreatorTier)

router.get('/basic-info', authenticate, UserController.getUserBasicInfo)

router.get('/:pageUrlName', authenticate, UserController.getCreatorPublicProfile)

module.exports = {
  router: router,
  basePath: 'users'
}
