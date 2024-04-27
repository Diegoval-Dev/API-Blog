import express from 'express'
import cors from 'cors'
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import logDetails from './middlewares/loggingMiddleware.js'
import v1PostRouter from './v1/routes/postRoutes.js'
import v1AuthRouter from './v1/routes/authRoutes.js'
import v1swaggerDocs from './v1/swagger.js'

dotenv.config()

const app = express()
const port = 3000
const filename = fileURLToPath(import.meta.url)
const myDirname = dirname(filename)

app.use(logDetails)
app.use(cors())
app.use(express.json())
v1swaggerDocs(app)
app.use('/api/v1/posts', v1PostRouter)
app.use('/api/v1/auth', v1AuthRouter)

app.use(express.static(join(myDirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(join(myDirname, '../public', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Error serving index.html')
    }
  })
})

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
