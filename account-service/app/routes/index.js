const fs = require('fs')
const path = require('path')
exports.bootstrap = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const route = require(`${__dirname}/${file}`)
    if (!route || !route.router) return
    app.use(`/api/${route.basePath ? `${route.basePath}` : ''}`, route.router)
  })
  app.get('/files/:fileName', function (req, res) {
    const filePath = path.join(__dirname, `../../uploads/${req.params.fileName}`)
    return res.sendFile(filePath)
  })
}
