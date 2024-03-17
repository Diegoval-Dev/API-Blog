import db from '../database/db.js'

const getAllPosts = () => {
  const allPosts = db.getAllPosts()
  return allPosts
}
const getPostById = () => {

}
const createNewPost = (newPost) => {
  const postToInsert = {
    ...newPost,
  }

  const createdPost = db.createPost(postToInsert)
  return createdPost
}
const updatePost = () => {

}
const deletePost = () => {

}

export default {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
}
