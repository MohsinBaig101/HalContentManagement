const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const postReactionController = require('../controllers/postReactionController')
const { authenticate } = require('../middleware/auth')
const createPostValidation = require('../validations/createPost.validation')
const PostLikeValidation = require('../validations/postLike.validation')
const PostCommentValidation = require('../validations/postComment.validation')
router.get('/getAll', postController.getPosts)

router.get('/:id', authenticate, postController.getPostById)
router.get('/postByStatus/:status', authenticate, postController.getPostByStatus)

router.post('/create/text', authenticate, [createPostValidation('text')], helper.validateRequest, postController.createPostText)
router.post('/create/image', authenticate, [createPostValidation('image', 'create')], helper.validateRequest, postController.createPostImage)
router.post('/create/audio', authenticate, [createPostValidation('audio', 'create')], helper.validateRequest, postController.createPostAudio)
router.post('/create/video', authenticate, [createPostValidation('video', 'create')], helper.validateRequest, postController.createPostVideo)

router.put('/update/text/:id', authenticate, helper.validateRequest, postController.updatePostText)
router.put('/update/image/:id', authenticate, [createPostValidation('image', 'update')], helper.validateRequest, postController.updatePostImage)
router.put('/update/audio/:id', authenticate, [createPostValidation('audio', 'update')], helper.validateRequest, postController.updatePostAudio)
router.put('/update/video/:id', authenticate, [createPostValidation('video', 'update')], helper.validateRequest, postController.updatePostVideo)
router.delete('/delete/:id', authenticate, postController.deletePost)

router.post('/react/:id', authenticate, [PostLikeValidation()], helper.validateRequest, postReactionController.postReaction)
router.post('/comment', authenticate, [PostCommentValidation()], helper.validateRequest, postReactionController.postCommentSave)
router.get('/comments/:id', authenticate, postReactionController.fetchPostComment)
router.get('/creator/:id', postController.getCreatorPosts)


router.get('/fans/feeds',authenticate, postController.fanFeeds)

module.exports = {
  router: router,
  basePath: 'posts'
}
