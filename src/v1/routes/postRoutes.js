import express from 'express'
import postController from '../../controllers/postController.js'

const router = express.Router()

router
  .get('/', postController.getAllPosts)
  .post('/', postController.createNewPost)
  .get('/:id', postController.getPostById)
  .put('/:id', postController.updatePost)
  .delete('/:id', postController.deletePost)

export default router
