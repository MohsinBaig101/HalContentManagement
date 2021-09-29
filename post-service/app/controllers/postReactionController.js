const PostReactService = require('../services/postReactionService')
const PostService = require('../services/postService')
module.exports = {
  postReaction: async (req, res) => {
    const id = req.params.id
    const react = req.body.react
    if (react !== 'like' || react !== 'dislike') {
      return helper.apiResponse(req, res, 'OK', true, null, 'Params Value Incorrect!, Value must be like or dislike')
    }
    try {
      const result = await PostReactService.postReact(react, id, req.user.id)
      if (result === null) {
        return helper.apiResponse(req, res, 'OK', true, null, 'Post Id Incorrect')
      } else {
        return helper.apiResponse(req, res, 'OK', false, null, `Post ${react === 'like' ? 'liked' : 'Dislike'} successfully`)
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  /** Post Comment  */
  postCommentSave: async (req, res) => {
    try {
      const userId = req.user.id
      const { postId, comment, parentId } = req.body
      const post = await PostService.getPostById(postId)
      const { token } = req.headers
      if (post) {
        const result = await PostReactService.postComment(post, comment, parentId, userId, token)
        return helper.apiResponse(req, res, 'OK', result.error, null, result.message)
      } else {
        return helper.apiResponse(req, res, 'OK', true, null, 'Post Id Incorrect')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  fetchPostComment: async (req, res) => {
    const postId = req.params.id
    const post = await PostService.getPostById(postId)
    if (!post) {
      return helper.apiResponse(req, res, 'OK', true, null, 'Post Id Incorrect')
    }
    const parentCommentId = req.query.parentCommentId || 0
    const itemPerPage = Number(req.query.itemPerPage) || 10
    const page = Number(req.query.page) || 1
    const { token } = req.headers
    try {
      let result = await PostReactService.fetchComment(token, post, parentCommentId, itemPerPage, page)
      if (result.status === 2) {
        result.data = helper.pagination(result.data, page, itemPerPage)
      }
      return helper.apiResponse(req, res, 'OK', result.error, result.status === 2 ? result.data : null, result.message)
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }
  /** */
}
