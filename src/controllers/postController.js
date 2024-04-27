import postService from '../services/postService.js'

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts()
    const response = {
      status: 'OK',
      data: allPosts,
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send('An error occurred while fetching posts')
  }
}

// eslint-disable-next-line consistent-return
const getPostById = async (req, res) => {
  const postId = req.params.id
  try {
    const post = await postService.getPostById(postId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred while fetching the post')
  }
}

// eslint-disable-next-line consistent-return
const createNewPost = async (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    bannerImageB64: req.body.bannerImageB64,
    category: req.body.category,
  }
  try {
    const createdPostResult = await postService.createNewPost(newPost)
    const postCreated = await postService.getPostById(createdPostResult.insertId)
    if (postCreated) {
      const postUrl = ` ${req.protocol}://${req.get('host')}/api/v1/posts/${postCreated.id} `
      res.setHeader('Location', postUrl)
      res.status(201).json(postCreated)
    } else {
      res.status(404).send('Post created but not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred while creating the post')
  }
}

// eslint-disable-next-line consistent-return
const updatePost = async (req, res) => {
  const { ...body } = req.body
  const postId = req.params.id
  const postToUpdate = {
    title: body.title,
    content: body.content,
    bannerImageB64: body.bannerImageB64,
    category: body.category,
  }
  try {
    const postUpdateResult = await postService.updatePost(postId, postToUpdate)
    if (postUpdateResult.affectedRows === 0) {
      return res.status(404).send('Post not found')
    }
    const updatedPost = await postService.getPostById(postId)
    if (updatedPost) {
      const postUrl = ` ${req.protocol}://${req.get('host')}/api/v1/posts/${updatedPost.id} `
      res.setHeader('Location', postUrl)
      res.status(201).json(updatedPost)
    } else {
      res.status(404).send('Post created but not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred while updating the post')
  }
}

// eslint-disable-next-line consistent-return
const deletePost = async (req, res) => {
  const postId = req.params.id

  try {
    const deletePostresult = await postService.deletePost(postId)
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
