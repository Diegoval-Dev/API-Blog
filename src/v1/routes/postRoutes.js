import express from 'express'
import postValidation from '../../controllers/validators.js'
import validationErrorHandler from '../../middlewares/validationErrorHandler.js'
import postController from '../../controllers/postController.js'

const router = express.Router()

router
  .get('/', postController.getAllPosts)
  .post('/', postValidation.createNewPost, validationErrorHandler, postController.createNewPost)
  .get('/:id', postController.getPostById)
  .put('/:id', postValidation.updatePost, validationErrorHandler, postController.updatePost)
  .delete('/:id', postController.deletePost)

export default router
