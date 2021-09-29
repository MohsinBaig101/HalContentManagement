const express = require('express')
const router = express.Router()
const RoleController = require('../controllers/roleController')

router.post('/insertRoles', RoleController.insertRole)
router.get('/get', RoleController.getRole)

module.exports = {
  router: router,
  basePath: '/role'
}
