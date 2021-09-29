const { Post, MediaLike, PostComment, User } = require('../models')
const { Op } = require('sequelize')
const db = require('../../config/connectDatabase')

const AccountService = require('../../externalService/accountService')
const PostReactionService = {
  postReact: async (react, postId, userId) => {
    const post = await Post.findOne({
      where: {
        id: postId
      }
    })
    if (post) {
      const isMediaExist = await MediaLike.findOne({
        where: {
          [Op.and]: {
            objectId: postId,
            objectType: 'post',
            userId: userId
          }
        }
      })
      if (isMediaExist) {
        return await MediaLike.update({ like: react }, {
          where: {
            [Op.and]: {
              objectId: postId,
              objectType: 'post',
              userId: userId
            }
          }
        })
      } else {
        return await MediaLike.create({
          objectId: postId,
          objectType: 'post',
          like: react,
          userId: userId
        })
      }
    } else {
      return null
    }
  },
  checkFanSubscribedTier: async (token, postTiers) => {
    const res = await AccountService.checkFanSubscribedCreatorTier(token, { tiers: postTiers })
    if (res && res.data === null) {
      return {
        message: res.message,
        status: 1,
        error: true
      }
    }
    if (res && res.data && res.data.length > 0) {
      return {
        status: 2,
        error: false
      }
    } else {
      return {
        message: 'Fan did\'t subscribe creator tier',
        status: 1,
        error: true
      }
    }
  },
  saveSubscribedPostComment: async (post, comment, parentId, userId, token, postTiers) => {
    const res = await PostReactionService.checkFanSubscribedTier(token, postTiers)
    if (res && res.status === 2) {
      await PostReactionService.saveComment(comment, parentId, post.id, userId)
      return {
        message: 'Comment Saved Successfully',
        status: 2,
        error: false
      }
    }
    return res;
  },
  postComment: async (post, comment, parentId, userId, token) => {
    if (post && post.accessRules && post.accessRules.whoCanSee === 'tier') {
      const postTiers = post.accessRules.tiers
      try {
        return await PostReactionService.saveSubscribedPostComment(post, comment, parentId, userId, token, postTiers)
      } catch (err) {
        return {
          message: 'Failed to Save Comment',
          status: 2,
          error: true
        }
      }
    } else {
      await PostReactionService.saveComment(comment, parentId, post.id, userId)
      return {
        message: 'Comment Saved Successfully',
        status: 2,
        error: false
      }
    }
  },
  saveComment: async (comment, parentId, postId, userId) => {
    return await PostComment.create({
      comment: comment,
      replyId: parentId,
      postId: postId,
      userId: userId
    })
  },
  fetchComment: async (token, post, parentCommentId, itemPerPage, page) => {
    const offset = (page - 1) * itemPerPage
    const repliesCountQuery = `(SELECT COUNT(replyId)FROM posts.postComments AS s WHERE s.replyId = postComments.id)`;
    if (post && post.accessRules && post.accessRules.whoCanSee === 'tier') {
      const postTiers = post.accessRules.tiers
      const res = await PostReactionService.checkFanSubscribedTier(token, postTiers)
      if (res && res.status === 2) {
        const postComment = await PostComment.findAndCountAll({
          limit: itemPerPage,
          offset: offset,
          // attributes: ['id', 'comment', 'replyId', 'createdAt'],
          attributes: ['id', 'comment', 'replyId', 'createdAt'].concat([
            [db.sequelize.literal(repliesCountQuery),'repliesCount']
          ]),
          where: {
            [Op.and]: {
              postId: post.id,
              replyId: parentCommentId
            }
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'profilePic']
          }
        }
        )
        return {
          data: postComment,
          status: 2,
          error: false,
          message: 'Comments Fetched Successfully'
        }
      }
      return res;
    } else {
      const postComment = await PostComment.findAndCountAll({
        limit: itemPerPage,
        offset: offset,
        // attributes: ['id', 'comment', 'replyId', 'createdAt'],
        attributes: ['id', 'comment', 'replyId', 'createdAt'].concat([
          [db.sequelize.literal(repliesCountQuery),'repliesCount']
        ]),
        where: {
          [Op.and]: {
            postId: post.id,
            replyId: parentCommentId
          }
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName', 'profilePic']
        }
      }
      )
      return {
        data: postComment,
        status: 2,
        error: false,
        message: 'Comments Fetched Successfully'
      }
    }
  }

}
module.exports = PostReactionService