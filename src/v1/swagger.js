import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A simple Express API for a blog',
    },
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              description: 'Unique identifier for the Post.',
            },
            title: {
              type: 'string',
              description: 'Title of the Post.',
            },
            content: {
              type: 'string',
              description: 'Content of the Post.',
            },
            bannerImageB64: {
              type: 'string',
              description: 'Banner image of the Post in Base64 encoding.',
              nullable: true,
            },
            category: {
              type: 'string',
              description: 'Category of the Post.',
              nullable: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the Post was created.',
            },
          },
        },
      },
    },
  },
  apis: ['src/v1/routes/postRoutes.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
