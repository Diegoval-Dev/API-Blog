import express from 'express'
import authController from '../../controllers/authController.js'
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    await authService.register(req.body.username, req.body.password)
    res.status(201).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const accessToken = await authService.login(
      req.body.username,
      req.body.password
    )
    res.json({ accessToken })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

export default router
