const express = require('express')
const router = express.Router()
const PermissionController = require('../controllers/permissionController')

router.post('/bulk', PermissionController.insertPermissionBulk)

module.exports = {
  router: router,
  basePath: '/permission'
}
