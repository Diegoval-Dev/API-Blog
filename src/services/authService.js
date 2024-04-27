import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database/db.js'

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
  )
  return result
}

async function login(username, password) {
  const result = await db.query('SELECT * FROM users WHERE username = ?', [
    username,
  ])
  const user = result[0]
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
    )
    return accessToken
  }
  throw new Error('Invalid login credentials')
}

export default {
  register,
  login,
}
