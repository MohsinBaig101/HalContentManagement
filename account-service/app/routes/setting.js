const express = require('express')
const router = express.Router()
const SettingController = require('../controllers/settingController')
const { authenticate } = require('../middleware/auth')

router.post('/settings/billing-cycle',authenticate, SettingController.saveBillingCycle)
router.get('/settings/get-billing-cycle',authenticate, SettingController.getBillingCycle)
router.post('/settings/page-setting',authenticate, SettingController.savePageSetting)
router.get('/settings/get-page-setting',authenticate, SettingController.getPageSetting)

module.exports = {
  router: router,
  basePath: 'users'
}
