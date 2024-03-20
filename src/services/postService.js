import db from '../database/db.js'

const getAllPosts = async () => {
  const allPosts = await db.getAllPosts()
  return allPosts
}
const getPostById = async (idPost) => {
  const post = await db.getPostById(idPost)
  return post
}
const createNewPost = async (newPost) => {
  const post = {
    ...newPost,
  }
  const created = await db.createPost(post.title, post.content, post.bannerImageB64, post.category)
  return created
}
const updatePost = async (id, postToUpdate) => {
  const post = {
    ...postToUpdate,
  }
  const updatedPost = await db.updatePost(
    id,
    post.title,
    post.content,
    post.bannerImageB64,
    post.category,
  )
  return updatedPost
}
const deletePost = async (idToDelete) => {
  const deleted = await db.deletePost(idToDelete)
  return deleted
}

export default {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
}
