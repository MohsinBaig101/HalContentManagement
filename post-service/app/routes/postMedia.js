const express = require('express')
const uploadPostMediaController = require('../controllers/uploadPostMediaController')
const { s3Bucket } = require('../../utils/s3Bucket')
const { imageFilter, audioFilter, videoFilter } = require('../../utils/fileFilters/filters')
const RemoveFileValidation = require('../validations/removeFile.validation')
const router = express.Router()
const { authenticate } = require('../middleware/auth')

const videoUpload = s3Bucket.upload(videoFilter).single('video')
const audioUpload = s3Bucket.upload(audioFilter).single('audio')
const imagesUpload = s3Bucket.upload(imageFilter).array('images')
const artWorkUpload = s3Bucket.upload(imageFilter).single('artWork')

router.post('/upload/video', authenticate,
  function (req, res, next) {
    videoUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Video files are allowed!',
          param: 'Video',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , uploadPostMediaController.uploadVideo)
router.post('/upload/audio', authenticate,
  function (req, res, next) {
    audioUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Audio files are allowed!',
          param: 'Audios',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , uploadPostMediaController.uploadAudio)
router.post('/upload/audio/artWork', authenticate,
  function (req, res, next) {
    artWorkUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Images are allowed!',
          param: 'artWork',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , uploadPostMediaController.uploadAudioArtWork)
router.post('/upload/attachments', authenticate, s3Bucket.upload().array('attachments'), uploadPostMediaController.uploadAttachments)
router.post('/upload/images', authenticate,
  function (req, res, next) {
    imagesUpload(req, res, function (err) {
      if (err) {
        const er = [{
          msg: 'Only Images are allowed!',
          param: 'images',
          location: 'body'
        }]
        return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
      }
      next()
    })
  }
  , uploadPostMediaController.uploadImages)
router.delete('/remove/media', authenticate, [RemoveFileValidation()], helper.validateRequest, uploadPostMediaController.removeMediaFromS3)

module.exports = {
  router: router,
  basePath: 'posts'
}
