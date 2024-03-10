import conn from './conn'

export const getAllPosts = async () => {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

export const createPost = async (title, content, bannerImage, category) => {
  const [result] = await conn.query('INSERT INTO blog_posts (title, content, bannerImageB64, category) VALUES (?, ?, ?, ?)', [title, content, bannerImage, category])
  return result
}

export const getPostById = async (id) => {
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
  return rows
}

export const updatePostById = async (id, title, content, bannerImage, category) => {
  const [result] = await conn.query('UPDATE blog_posts SET title = ?, content = ?, bannerImageB64 = ?, category = ? WHERE id = ?', [title, content, bannerImage, category, id])
  return result
}

export const deletePostById = async (id) => {
  const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
  return result
}
