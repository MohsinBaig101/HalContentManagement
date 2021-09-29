const { Post, PostTier } = require('../models')
const { Op } = require('sequelize')
const { User, PostTempMedia, TierSubscription } = require('../models')
const db = require('../models')
const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize')
const _ = require('lodash')
const path = require('path')
const accountService = require('../../externalService/accountService')
const { getSignedURLOfFile } = require('../../utils/s3Bucket')

module.exports = {
  createTextPost: async (data) => {
    const postObj = await Post.create({
      title: data.title,
      description: data.description,
      accessRules: data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
      teaserText: data.teaserText,
      postType: 'text',
      status: data.status,
      attributes: {
        attachments: data.attachments,
        tags: data.tags
      },
      userId: data.userId
    })
    await module.exports.insertPostTiers(data, postObj)
    return postObj
  },
  updateTextPost: async (data) => {
    const postObj = await Post.findOne({
      where: {
        [Op.and]: {
          id: data.id,
          userId: data.userId,
          postType: 'text'
        }
      }
    })
    if (postObj) {
      postObj.title = data.title
      postObj.description = data.description
      postObj.accessRules = data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
        postObj.teaserText = data.teaserText
      postObj.postType = 'text'
      postObj.status = data.status
      postObj.attributes = {
        attachments: data.attachments,
        tags: data.tags
      }
      postObj.userId = data.userId
      await postObj.save()
      await module.exports.insertPostTiers(data, postObj, 'update')
      return {
        status: true,
        msg: 'Post update successfully'
      }
    } else {
      return {
        status: false,
        msg: 'Post Not Found'
      }
    }
  },
  createImagePost: async (data) => {
    const postObj = await Post.create({
      title: data.title,
      description: data.description,
      accessRules: data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
      teaserText: data.teaserText,
      postType: 'image',
      status: data.status,
      attributes: {
        attachments: data.attachments,
        tags: data.tags,
        images: data.images
      },
      userId: data.userId
    })
    await module.exports.insertPostTiers(data, postObj)
    return postObj
  },
  updateImagePost: async (data) => {
    const postObj = await Post.findOne({
      where: {
        [Op.and]: {
          id: data.id,
          userId: data.userId,
          postType: 'image'
        }
      }
    })
    if (postObj) {
      postObj.title = data.title
      postObj.description = data.description
      postObj.accessRules = data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null
      postObj.teaserText = data.teaserText
      postObj.postType = 'image'
      postObj.status = data.status
      postObj.attributes = {
        attachments: data.attachments,
        tags: data.tags,
        images: data.images
      }
      postObj.userId = data.userId
      await postObj.save()
      await module.exports.insertPostTiers(data, postObj, 'update')
      return {
        status: true,
        msg: 'Post update successfully'
      }
    } else {
      return {
        status: false,
        msg: 'Post Not Found'
      }
    }
  },
  createAudioPost: async (data) => {
    const postObj = await Post.create({
      title: data.title,
      description: data.description,
      accessRules: data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
      teaserText: data.teaserText,
      postType: 'audio',
      status: data.status,
      attributes: {
        attachments: data.attachments,
        tags: data.tags,
        audios: data.audios,
        artImage: data.artImage
      },
      userId: data.userId
    })
    await module.exports.insertPostTiers(data, postObj)
    return postObj
  },
  updateAudioPost: async (data) => {
    const postObj = await Post.findOne({
      where: {
        [Op.and]: {
          id: data.id,
          userId: data.userId,
          postType: 'audio'
        }
      }
    })
    if (postObj) {
      postObj.title = data.title
      postObj.description = data.description
      postObj.accessRules = data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null
      postObj.teaserText = data.teaserText
      postObj.postType = 'audio'
      postObj.status = data.status
      postObj.attributes = {
        attachments: data.attachments,
        tags: data.tags,
        audios: data.audios,
        artImage: data.artImage
      }
      postObj.userId = data.userId
      await postObj.save()
      await module.exports.insertPostTiers(data, postObj, 'update')
      return {
        status: true,
        msg: 'Post update successfully'
      }
    } else {
      return {
        status: false,
        msg: 'Post Not Found'
      }
    }
  },
  createVideoPost: async (data) => {
    const postObj = await Post.create({
      title: data.title,
      description: data.description,
      accessRules: data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
      teaserText: data.teaserText,
      postType: 'video',
      status: data.status,
      attributes: {
        attachments: data.attachments,
        tags: data.tags,
        video: data.video
      },
      userId: data.userId
    })
    await module.exports.insertPostTiers(data, postObj)
    return postObj
  },
  updateVideoPost: async (data) => {
    const postObj = await Post.findOne({
      where: {
        [Op.and]: {
          id: data.id,
          userId: data.userId,
          postType: 'video'
        }
      }
    })
    if (postObj) {
      postObj.title = data.title
      postObj.description = data.description
      postObj.accessRules = data.userAccessRule ? typeof data.userAccessRule === 'object' ? data.userAccessRule : JSON.parse(data.userAccessRule) : null,
        postObj.teaserText = data.teaserText
      postObj.postType = 'video'
      postObj.status = data.status
      postObj.attributes = {
        attachments: data.attachments,
        tags: data.tags,
        video: data.video
      }
      postObj.userId = data.userId
      await postObj.save()
      await module.exports.insertPostTiers(data, postObj, 'update')
      return {
        status: true,
        msg: 'Post update successfully'
      }
    } else {
      return {
        status: false,
        msg: 'Post Not Found'
      }
    }
  },
  deleteSinglePost: async (postId, creatorId) => {
    return await Post.destroy({
      where: {
        [Op.and]: {
          id: postId,
          userId: creatorId
        }
      }
    })
  },
  getPostById: async (id) => {
    return await Post.findOne({ where: { id: id } })
  },
  getPostByStatus: async (status, userId, withUser = false) => {
    if (withUser) {
      return await Post.findAll({
        attributes: ['id', 'title', 'description', 'postType', 'teaserText', 'status', 'attributes', 'accessRules'],
        where: {
          [Op.and]: {
            status: status,
            userId: userId
          }
        },
        include: [
          {
            model: User,
            on: {
              // this is where magic happens
              userId: Sequelize.literal('`Post`.`userId` = `User`.`id`')
            },
            attributes: ['firstName', 'lastName', 'email', 'phone']

          }
        ]
      })
    } else {
      return await Post.findAll({
        where: {
          [Op.and]: {
            status: status,
            userId: userId
          }
        }
      })
    }
  },
  insertPostTiers: async (data, postObj, mode = 'create') => {
    if (data.userAccessRule.whoCanSee === 'tier') {
      const postTiersArr = []
      data.userAccessRule.tiers.forEach(element => {
        postTiersArr.push({
          postId: postObj.id,
          tierId: element,
          status: 'active'
        })
      })
      if (mode === 'create') {
        await PostTier.bulkCreate(postTiersArr)
      } else if (mode === 'update') {
        await PostTier.destroy({ where: { postId: postObj.id } })
        await PostTier.bulkCreate(postTiersArr)
      }
    } else {
      if (mode === 'update') {
        await PostTier.destroy({ where: { postId: postObj.id } })
      }
    }
  },
  getPostsForFans: async (fanId, creatorId, token) => {
    const posts = await Post.findAll({
      where: {
        userId: creatorId
      }
    })
    if (token) {
      const subscribedTiers = await accountService.getSubscribedTiers(token)
    }
    if (posts) {
      const postsArr = posts.map(post => {
        if (post.accessRules.whoCanSee === 'tier') {
          return {
            title: post.title,
            teaserText: post.teaserText,
            createdAt: post.createdAt,
            postType: post.postType
          }
        } else {
          return {
            ...post
          }
        }
      })
      return {
        status: 1,
        data: postsArr
      }
    } else {
      return {
        status: 0
      }
    }
  },
  saveTempMedia: async (key) => {
    return PostTempMedia.create({
      name: key
    })
  },
  removeTempMedia: async (key) => {
    return PostTempMedia.destroy({
      where: {
        name: key
      }
    })
  },
  removeTempMediaMultiple: async (keys = []) => {
    return PostTempMedia.destroy({ where: { name: keys } })
  },
  getPostSignedUrl: async (posts) => {
    const newPosts = []
    for (const postObj of posts) {
      const post = postObj.dataValues
      if (post.postType === 'image') {
        const imageUrls = []
        const attachmentsUrls = []
        const postImages = post.attributes.images
        const postAttachments = post.attributes.attachments

        for (const key of postImages) {
          const url = await getSignedURLOfFile(key)
          imageUrls.push(url)
        }

        for (const key of postAttachments) {
          const url = await getSignedURLOfFile(key)
          attachmentsUrls.push(url)
        }
        newPosts.push({
          ...post,
          attributes: {
            ...post.attributes,
            imageUrls,
            attachmentsUrls
          }
        })
      }
      if (post.postType === 'video') {
        const videoUrls = []
        const attachmentsUrls = []
        const postVideo = post.attributes.video
        const postAttachments = post.attributes.attachments

        for (const key of postVideo) {
          const url = await getSignedURLOfFile(key)
          videoUrls.push(url)
        }

        for (const key of postAttachments) {
          const url = await getSignedURLOfFile(key)
          attachmentsUrls.push(url)
        }
        newPosts.push({
          ...post,
          attributes: {
            ...post.attributes,
            videoUrls,
            attachmentsUrls
          }
        })
      }
      if (post.postType === 'audio') {
        const audiosUrls = []
        const artImageUrl = []
        const attachmentsUrls = []
        const postAudios = post.attributes.audios
        const postArtImage = post.attributes.artImage
        const postAttachments = post.attributes.attachments

        for (const key of postAudios) {
          const url = await getSignedURLOfFile(key)
          audiosUrls.push(url)
        }
        for (const key of postArtImage) {
          const url = await getSignedURLOfFile(key)
          artImageUrl.push(url)
        }

        for (const key of postAttachments) {
          const url = await getSignedURLOfFile(key)
          attachmentsUrls.push(url)
        }
        newPosts.push({
          ...post,
          attributes: {
            ...post.attributes,
            audiosUrls,
            attachmentsUrls,
            artImageUrl
          }
        })
      }
      if (post.postType === 'text') {
        const attachmentsUrls = []
        const postAttachments = post.attributes.attachments
        for (const key of postAttachments) {
          const url = await getSignedURLOfFile(key)
          attachmentsUrls.push(url)
        }
        newPosts.push({
          ...post,
          attributes: {
            ...post.attributes,
            attachmentsUrls
          }
        })
      }
    }
    return newPosts
  },
  getPostSignedUrlSinglePost: async (postObj) => {
    const newPosts = []
    const post = postObj.dataValues
    if (post.postType === 'image') {
      const imageUrls = []
      const attachmentsUrls = []
      const postImages = post.attributes.images
      const postAttachments = post.attributes.attachments

      for (const key of postImages) {
        const url = await getSignedURLOfFile(key)
        imageUrls.push(url)
      }

      for (const key of postAttachments) {
        const url = await getSignedURLOfFile(key)
        attachmentsUrls.push(url)
      }
      newPosts.push({
        ...post,
        attributes: {
          ...post.attributes,
          imageUrls,
          attachmentsUrls
        }
      })
    }
    if (post.postType === 'video') {
      const videoUrls = []
      const attachmentsUrls = []
      const postVideo = post.attributes.video
      const postAttachments = post.attributes.attachments

      for (const key of postVideo) {
        const url = await getSignedURLOfFile(key)
        videoUrls.push(url)
      }

      for (const key of postAttachments) {
        const url = await getSignedURLOfFile(key)
        attachmentsUrls.push(url)
      }
      newPosts.push({
        ...post,
        attributes: {
          ...post.attributes,
          videoUrls,
          attachmentsUrls
        }
      })
    }
    if (post.postType === 'audio') {
      const audiosUrls = []
      const artImageUrl = []
      const attachmentsUrls = []
      const postAudios = post.attributes.audios
      const postArtImage = post.attributes.artImage
      const postAttachments = post.attributes.attachments

      for (const key of postAudios) {
        const url = await getSignedURLOfFile(key)
        audiosUrls.push(url)
      }
      for (const key of postArtImage) {
        const url = await getSignedURLOfFile(key)
        artImageUrl.push(url)
      }

      for (const key of postAttachments) {
        const url = await getSignedURLOfFile(key)
        attachmentsUrls.push(url)
      }
      newPosts.push({
        ...post,
        attributes: {
          ...post.attributes,
          audiosUrls,
          attachmentsUrls,
          artImageUrl
        }
      })
    }
    if (post.postType === 'text') {
      const attachmentsUrls = []
      const postAttachments = post.attributes.attachments
      for (const key of postAttachments) {
        const url = await getSignedURLOfFile(key)
        attachmentsUrls.push(url)
      }
      newPosts.push({
        ...post,
        attributes: {
          ...post.attributes,
          attachmentsUrls
        }
      })
    }
    return newPosts
  },
  getFanFeeds: async (userId) => {
    // return await Post.findAll({
    //   include: [
    //     {
    //       model: PostTier,
    //       // as : 'p_t',
    //       include: [
    //         {
    //           model: TierSubscription,
    //           // as : 'tierSub',
    //           where: {
    //             userId: userId
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // })
    return await db.sequelize.query(`SELECT p.* FROM posts.posts AS p LEFT JOIN posts.postTiers AS p_t ON p_t.postId = p.id LEFT JOIN account.tiers_subscriptions AS tierSub ON tierSub.tierId = p_t.tierId WHERE tierSub.userId = ${userId} || JSON_VALUE(p.accessRules, '$.whoCanSee') = 'free'`
      , { type: QueryTypes.SELECT });
  }

}
