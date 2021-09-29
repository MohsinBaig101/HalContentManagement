const Sequelize = require('sequelize')
const _ = require('lodash')
const postService = require('../services/postService')
const { getSignedURLOfFile, deleteFile } = require('../../utils/s3Bucket')
module.exports = {
  uploadVideo: async (req, res, next) => {
    if (req.file === undefined) {
      const er = [{
        msg: 'Please Select at least one file',
        param: 'video',
        location: 'body'
      }]
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
    }
    try {
      const video = req.file
      const signedUrl = []
      const url = await getSignedURLOfFile(video.key)
      signedUrl.push({
        url: url,
        key: video.key
      })
      postService.saveTempMedia(video.key)
      return helper.apiResponse(req, res, 'OK', false, signedUrl, 'Video uploaded successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'OK', true, err, 'Error', true)
    }
  },
  uploadAudio: async (req, res, next) => {
    if (req.file === undefined) {
      const er = [{
        msg: 'Please Select at least one file',
        param: 'audio',
        location: 'body'
      }]
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
    }
    try {
      const audio = req.file
      const signedUrl = []
      const url = await getSignedURLOfFile(audio.key)
      signedUrl.push({
        url: url,
        key: audio.key
      })
      postService.saveTempMedia(audio.key)
      return helper.apiResponse(req, res, 'OK', false, signedUrl, 'Audio File uploaded successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'OK', true, err, 'Error', true)
    }
  },
  uploadAudioArtWork: async (req, res, next) => {
    if (req.file === undefined) {
      const er = [{
        msg: 'Please Select at least one file',
        param: 'ArtWork',
        location: 'body'
      }]
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
    }
    try {
      const artWork = req.file
      let signedUrl = {}
      const url = await getSignedURLOfFile(artWork.key)
      postService.saveTempMedia(artWork.key)
      signedUrl = {
        url: url,
        key: artWork.key
      }
      return helper.apiResponse(req, res, 'OK', false, signedUrl, 'Art Work uploaded successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  uploadAttachments: async (req, res, next) => {
    if (req.files === undefined || req.files.length <= 0) {
      const er = [{
        msg: 'Please Select at least one file',
        param: 'attachments',
        location: 'body'
      }]
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
    }
    try {
      const attachments = req.files
      const signedUrl = []
      for (const element of attachments) {
        const url = await getSignedURLOfFile(element.key)
        postService.saveTempMedia(element.key)
        signedUrl.push({
          url: url,
          key: element.key
        })
      }
      return helper.apiResponse(req, res, 'OK', false, signedUrl, 'Attachments uploaded successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'OK', true, err, 'Error', true)
    }
  },
  uploadImages: async (req, res, next) => {
    if (req.files === undefined || req.files.length <= 0) {
      const er = [{
        msg: 'Please Select at least one file',
        param: 'images',
        location: 'body'
      }]
      return helper.apiResponse(req, res, 'VALIDATION_ERR', true, er, 'Validation Error', true)
    }
    try {
      const images = req.files
      const signedUrl = []
      for (const element of images) {
        const url = await getSignedURLOfFile(element.key)
        postService.saveTempMedia(element.key)
        signedUrl.push({
          url: url,
          key: element.key
        })
      }
      return helper.apiResponse(req, res, 'OK', false, signedUrl, 'Images uploaded successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  removeMediaFromS3: async (req, res, next) => {
    try {
      const key = req.body.fileKey
      if (key) {
        deleteFile(key)
        postService.removeTempMedia(key)
        return helper.apiResponse(req, res, 'OK', false, null, 'File Removed Successfully')
      } else {
        return helper.apiResponse(req, res, 'OK', true, null, 'Invalid Url')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }
}
