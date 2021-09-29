const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.js')
const swaggerJSDoc = require('swagger-jsdoc')

exports.bootstrap = app => {
  require('./app/helpers').bootstrap()
  require('./app/routes/').bootstrap(app)
  const db = require('./app/models')
  db.sequelize.sync()

  const options = {
    swaggerDefinition: swaggerDoc,
    apis: ['./app/*/*.js']
  }
  const specs = swaggerJSDoc(options)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
