import postService from '../services/postService.js'
import validationResult from './validators.js'

const getAllPosts = (req, res) => {
  try {
    const allPosts = postService.getAllPosts()
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).send('An error occurred while fetching posts')
  }
}

const getPostById = (req, res) => {
  const { postId } = req.params

  const { errors } = validationResult.getPostById(req)
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const post = postService.getPostById(postId)
    if (post.length > 0) {
      res.satus(200).json(post)
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred while fetching the post')
  }
}

// eslint-disable-next-line consistent-return
const createNewPost = (req, res) => {
  const { body } = req.body

  const { errors } = validationResult.createNewPost(req)
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  const newPost = {
    title: body.title,
    content: body.content,
    bannerImageB64: body.bannerImageB64,
    category: body.category,
  }
  try {
    const createdPost = postService.createNewPost(newPost)
    res.status(200).json(createdPost)
  } catch (error) {
    res.status(500).send('An error occurred while creating the post')
  }
}

// eslint-disable-next-line consistent-return
const updatePost = (req, res) => {
  const { body } = req.body
  const { postId } = req.params

  const { errors } = validationResult.updatePost(req)

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  const postToUpdate = {
    title: body.title,
    content: body.content,
    bannerImageB64: body.bannerImageB64,
    category: body.category,
  }

  try {
    const postUpdateResult = postService.updatePost(postId, postToUpdate)
    if (postUpdateResult.affectedRows === 0) {
      return res.status(404).send('Post not found')
    }
    const updatedPost = postService.getPostById(postId)
    res.status(200).json(updatedPost[0])
  } catch (error) {
    res.status(500).send('An error occurred while updating the post')
  }
}

// eslint-disable-next-line consistent-return
const deletePost = async (req, res) => {
  const { postId } = req.params

  const { errors } = validationResult.getPostById(req)
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const deletePostresult = postService.deletePost(postId)
    if (deletePostresult.affectedRows > 0) {
      res.status(204).send('Post deleted successfully')
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred while deleting the post')
  }
}

export default {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
}
