import authService from '../services/authService.js'

const register = async (req, res) => {
  try {
    await authService.register(req.body.username, req.body.password)
    res.status(201).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const login = async (req, res) => {
  try {
    const accessToken = await authService.login(
      req.body.username,
      req.body.password,
    )
    res.json({ accessToken })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export default {
  register,
  login,
}
