// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from 'express-validator'

// eslint-disable-next-line consistent-return
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export default validationErrorHandler
