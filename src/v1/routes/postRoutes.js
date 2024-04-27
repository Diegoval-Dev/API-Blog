import express from 'express'
import postValidation from '../../controllers/validators.js'
import validationErrorHandler from '../../middlewares/validationErrorHandler.js'
import postController from '../../controllers/postController.js'
import authenticateToken from '../../middlewares/authenticateToken.js'

const router = express.Router()

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retrieves a list of posts.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/', postController.getAllPosts)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retrieves a single post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the post.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A single post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/:id', postController.getPostById)

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Creates a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: 'Mi Nuevo Post 2'
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 example: 'Este es el contenido de mi nuevo post.'
 *               bannerImageB64:
 *                 type: string
 *                 description: Banner image for the post in Base64 encoding
 *                 example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...'
 *               category:
 *                 type: string
 *                 description: Category of the post
 *                 example: 'Tecnología'
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', authenticateToken, postValidation.createNewPost, validationErrorHandler, postController.createNewPost)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Updates an existing post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the post to update.
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: 'Mi Nuevo Post 2'
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 example: 'Este es el contenido de mi nuevo post.'
 *               bannerImageB64:
 *                 type: string
 *                 description: Banner image for the post in Base64 encoding
 *                 example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...'
 *               category:
 *                 type: string
 *                 description: Category of the post
 *                 example: 'Tecnología'
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Post updated successfully.
 */
router.put('/:id', authenticateToken, postValidation.updatePost, validationErrorHandler, postController.updatePost)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Deletes a post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the post to delete.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 */
router.delete('/:id', authenticateToken, postController.deletePost)

export default router
