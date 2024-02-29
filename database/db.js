import conn from './conn.js'

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts')
    return rows
}

export async function createPost(title, content, banner_image_url, category) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content, banner_image_url, category) VALUES (?, ?, ?, ?)', [title, content, banner_image_url, category])
    return result
}

export async function getPostById(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
    return rows
}

export async function updatePostById(id, title, content, banner_image_url, category) {
    const [result] = await conn.query('UPDATE blog_posts SET title = ?, content = ?, banner_image_url = ?, category = ? WHERE id = ?', [title, content, banner_image_url, category, id])
    return result
}

export async function deletePostById(id) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
    return result
}