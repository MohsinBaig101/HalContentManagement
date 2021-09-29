const Sequelize = require('sequelize')
const _ = require('lodash')
const postService = require('../services/postService')
const { Post } = require('../models')
const { User } = require('../models')
const accountService = require('../../externalService/accountService')
const { authenticate } = require('../middleware/auth')

module.exports = {
  // Retrieve and return records from the database.
  /** Example how we can join between two different Database Tables */
  getPosts: async (req, res, next) => {
    try {
      const result = await Post.findAll({
        include: [
          {
            model: User,
            on: {
              // this is where magic happens
              userId: Sequelize.literal('`Post`.`id` = `User`.`id`')
            }
          }
        ]
      })
      return helper.apiResponse(req, res, 'OK', false, await result, 'Post Fetched')
    } catch (err) {
      return helper.apiResponse(req, res, 'OK', true, err, 'Error', true)
    }
  },
  /** End Example */

  createPostText: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments ? req.body.attachments : []
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      await postService.createTextPost(postData)
      if (req.body.attachments && req.body.attachments.length > 0) {
        postService.removeTempMediaMultiple(req.body.attachments)
      }
      const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, `Post ${msg} successfully`)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  updatePostText: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      id: req.params.id
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      const result = await postService.updateTextPost(postData)
      if (req.body.attachments && req.body.attachments.length > 0) {
        postService.removeTempMediaMultiple(req.body.attachments)
      }
      return helper.apiResponse(req, res, 'CREATED', false, null, result.msg)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  createPostImage: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      images: req.body.images || []
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      await postService.createImagePost(postData)
      if ((req.body.images && req.body.images.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.images))
      }
      const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, `Post ${msg} successfully`)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  updatePostImage: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      images: req.body.images || [],
      id: req.params.id
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      const result = await postService.updateImagePost(postData)
      if ((req.body.images && req.body.images.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.images))
      }
      // const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, result.msg)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  createPostAudio: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      audios: req.body.audios || [],
      artImage: req.body.artImage || []
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      await postService.createAudioPost(postData)
      if ((req.body.audios && req.body.audios.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.audios))
      }
      const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, `Post ${msg} successfully`)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  updatePostAudio: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      audios: req.body.audios || [],
      artImage: req.body.artImage || [],
      id: req.params.id
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      const result = await postService.updateAudioPost(postData)
      if ((req.body.audios && req.body.audios.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.audios))
      }
      // const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, result.msg)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  createPostVideo: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      video: req.body.video || []
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      await postService.createVideoPost(postData)
      if ((req.body.video && req.body.video.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.video))
      }
      const msg = (req.body.status === 'published') ? 'Published' : (req.body.status === 'draft') ? 'Draft' : (req.body.status === 'schedule') ? 'Schedule' : ''
      return helper.apiResponse(req, res, 'CREATED', false, null, `Post ${msg} successfully`)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  updatePostVideo: async (req, res, next) => {
    const postData = {
      title: req.body.title || '',
      description: req.body.description || '',
      tags: req.body.tags || [],
      userAccessRule: req.body.userAccessRule ? typeof req.body.userAccessRule === 'object' ? req.body.userAccessRule : JSON.parse(req.body.userAccessRule) : null,
      teaserText: req.body.teaserText || '',
      status: req.body.status || 'draft',
      userId: req.user.id,
      attachments: req.body.attachments || [],
      video: req.body.video || [],
      id: req.params.id
    }
    try {
      if (postData.userAccessRule && postData.userAccessRule.whoCanSee === 'tier') {
        const result = await module.exports.validateTiersIds(req, res, postData)
        if (result.status) {
          return helper.apiResponse(req, res, 'OK', true, null, 'Tiers Ids are incorrect')
        }
      }
      const result = await postService.updateVideoPost(postData)
      if ((req.body.video && req.body.video.length > 0) || (req.body.attachments && req.body.attachments.length > 0)) {
        postService.removeTempMediaMultiple(postData.attachments.concat(req.body.video))
      }
      return helper.apiResponse(req, res, 'CREATED', false, null, result.msg)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  deletePost: async (req, res) => {
    const postId = req.params.id
    try {
      const result = await postService.deleteSinglePost(postId, req.user.id)
      if (result === 1) {
        return helper.apiResponse(req, res, 'OK', false, null, 'Post delete successfully')
      } else if (result === 0) {
        return helper.apiResponse(req, res, 'OK', true, null, 'Incorrect Post Id')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getPostById: async (req, res, next) => {
    const id = req.params.id
    try {
      let result = await postService.getPostById(id)
      if (result) {
        result = await postService.getPostSignedUrlSinglePost(result)
        if (result.length > 0) {
          result = result[0]
        }
        return helper.apiResponse(req, res, 'OK', false, result, 'Post fetched successfully')
      } else {
        return helper.apiResponse(req, res, 'OK', true, result, 'Post Id Incorrect')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getPostByStatus: async (req, res, next) => {
    const status = req.params.status
    try {
      let result = await postService.getPostByStatus(status, req.user.id, false)
      if (result.length > 0) {
        result = await postService.getPostSignedUrl(result)
      }
      return helper.apiResponse(req, res, 'OK', false, result, 'Post fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  validateTiersIds: async (req, res, postData) => {
    const { token } = req.headers
    let status = 0
    const tiers = await accountService.getUserTier(token)
    if (tiers && tiers.data && tiers.data.length > 0) {
      postData.userAccessRule.tiers.forEach(element => {
        const result = helper.findValueInArray(tiers.data, element)
        if (!result) {
          status = 1
        }
      })
    } else {
      status = 1
    }
    return new Promise((resolve, reject) => {
      resolve({
        status: status !== 0
      })
    })
  },
  getCreatorPosts: async (req, res, next) => {
    try {
      const { token } = req.headers
      if (token) {
        await authenticate(req, res, next)
      }
      const creatorId = req.params.id
      const userId = req.user ? req.user.id : null
      const result = await postService.getPostsForFans(userId, creatorId, token)
      const data = result.status === 1 ? result.data : []
      return helper.apiResponse(req, res, 'OK', false, data, 'Posts fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  fanFeeds: async (req, res) => {
    const userId = req.user.id
    try {
      const result = await postService.getFanFeeds(userId)
      return helper.apiResponse(req, res, 'OK', false, result, 'Posts fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }


}
