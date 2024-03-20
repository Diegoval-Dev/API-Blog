// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from 'express-validator'

const postValidation = {
  createNewPost: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty().isLength({ max: 140 }),
    body('bannerImageB64')
      .isString()
      .notEmpty()
      .matches(/^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/]+={0,2}$/)
      .withMessage('The image is not in base64 format'),
    body('category').isString().notEmpty(),
  ],
  updatePost: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('bannerImageB64')
      .isString().notEmpty()
      .matches(/^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/]+={0,2}$/)
      .withMessage('The image is not in base64 format'),
    body('category').isString().notEmpty(),
  ],
}

export default postValidation
