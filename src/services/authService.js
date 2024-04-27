import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database/db.js'

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  await db.createUser(username, hashedPassword)
}

async function login(username, password) {
  const user = await db.getUserByUsername(username)
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
