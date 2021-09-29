exports.bootstrap = app => {
  require('./app/helpers').bootstrap()
  // global.Helper = helper.Helper
  require('./app/routes/').bootstrap(app)
  const db = require('./app/models')
  db.sequelize.sync()
}
