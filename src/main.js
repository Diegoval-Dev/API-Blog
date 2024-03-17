import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import logDetails from './middlewares/loggingMiddleware.js'
import v1PostRouter from './v1/routes/postRoutes.js'

const app = express()
const port = 3000
const filename = fileURLToPath(import.meta.url)
const myDirname = dirname(filename)

app.use(logDetails)
app.use(cors())
app.use(express.json())
app.use('/api/v1/posts', v1PostRouter)

app.get('/', (req, res) => {
  res.sendFile(join(myDirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Error serving index.html')
    }
  })
})

// GET /posts
// app.get('/posts', async (req, res) => {
//   try {
//     const posts = await getAllPosts()
//     res.status(200).json(posts)
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching posts')
//   }
// })

// POST /posts
// eslint-disable-next-line consistent-return
// app.post('/posts', async (req, res) => {
//   const {
//     title, content, bannerImageB64, category,
//   } = req.body
//   if (!title || !content || !bannerImageB64 || !category) {
//     return res.status(400).send('Missing or malformed data in the body')
//   }
//   if (!isValidBase64(bannerImageB64)) {
//     return res.status(400).send('Image is not in Base64 format')
//   }
//   try {
//     const result = await createPost(title, content, bannerImageB64, category)
//     res.status(200).json(result)
//   } catch (error) {
//     res.status(500).send('An error occurred while creating the post')
//   }
// })

// GET /posts/:id
// app.get('/posts/:postId', async (req, res) => {
//   try {
//     const { postId } = req.params
//     const post = await getPostById(postId)
//     if (post.length > 0) {
//       res.json(post)
//     } else {
//       res.status(404).send('Post not found')
//     }
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching the post')
//   }
// })

// PUT /posts/:id
// eslint-disable-next-line consistent-return
// app.put('/posts/:postId', async (req, res) => {
//   const { postId } = req.params
//   const {
//     title, content, bannerImageB64, category,
//   } = req.body

//   if (!title || !content || !bannerImageB64 || !category) {
//     return res.status(400).send('Missing or malformed data in the body')
//   }
//   if (!isValidBase64(bannerImageB64)) {
//     return res.status(400).send('Image is not in Base64 format')
//   }
//   try {
//     const result = await updatePostById(postId, title, content, bannerImageB64, category)
//     if (result.affectedRows === 0) {
//       return res.status(404).send('Post not found')
//     }
//     const updatedPost = await getPostById(postId)
//     res.status(200).json(updatedPost[0])
//   } catch (error) {
//     res.status(500).send('An error occurred while updating the post')
//   }
// })

// DELETE /posts/:id
// app.delete('/posts/:postId', async (req, res) => {
//   try {
//     const { postId } = req.params
//     const result = await deletePostById(postId)
//     if (result.affectedRows > 0) {
//       res.status(204).send()
//     } else {
//       res.status(404).send('Post not found')
//     }
//   } catch (error) {
//     res.status(500).send('An error occurred while deleting the post')
//   }
// })

app.use((req, res) => {
  res.status(404).send('404 Not Found')
})

app.use((err, req, res) => {
  res.status(500).send('Server error!')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
