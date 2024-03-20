import conn from './conn.js'

const getAllPosts = async () => {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

const createPost = async (title, content, bannerImage, category) => {
  const [result] = await conn.query('INSERT INTO blog_posts (title, content, bannerImageB64, category) VALUES (?, ?, ?, ?)', [title, content, bannerImage, category])
  return result
}

const getPostById = async (id) => {
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
  return rows
}

const updatePost = async (id, title, content, bannerImage, category) => {
  const [result] = await conn.query(
    'UPDATE blog_posts SET title = ?, content = ?, bannerImageB64 = ?, category = ? WHERE id = ?',
    [title, content, bannerImage, category, id],
  )
  return result
}

const deletePost = async (id) => {
  const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
  return result
}

export default {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
}
