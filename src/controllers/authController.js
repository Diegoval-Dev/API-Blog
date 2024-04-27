import authService from '../services/authService.js'

const register = async (req, res) => {
  try {
    await authService.register(req.body.username, req.body.password)
    const response = {
      status: 'OK',
    }
    res.status(201).json(response)
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
    const response = {
      status: 'OK',
      data: {
        username: req.body.username,
        token: accessToken,
      },
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export default {
  register,
  login,
}
