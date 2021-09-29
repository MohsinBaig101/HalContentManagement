const settingService = require('../services/settingService')
module.exports = {
  saveBillingCycle: async (req, res, next) => {
    try {
      const data = {
        billingCycle: req.body.billingCycle,
        userId: req.user.id
      }
      await settingService.saveBillingCycle(data)
      return helper.apiResponse(req, res, 'OK', false, null, 'Billing Setting saved successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getBillingCycle: async (req, res) => {
    const userId = req.user.id
    try {
      const result = await settingService.getBillingCycle(userId)
      return helper.apiResponse(req, res, 'OK', false, result, 'Billing Setting fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  savePageSetting: async (req, res) => {
    try {
      const slugArr = ['hidePostBtn', 'hideSubscriberCount', 'emailForNewSubscriber', 'emailForComment', 'adultContent', 'googleAnalyticId'];
      const isExist = slugArr.find(val => val === req.body.slug)
      if (!isExist) {
        return helper.apiResponse(req, res, 'OK', true, null, 'Slug value incorrect')
      }
      const valueArr = ['yes', 'no'];
      if (!valueArr.find(val => val === req.body.value)) {
        return helper.apiResponse(req, res, 'OK', true, null, 'Value param incorrect')
      }
      const data = {
        slug: req.body.slug,
        value: req.body.value,
        userId: req.user.id
      }
      await settingService.savePageSetting(data)
      return helper.apiResponse(req, res, 'OK', false, null, 'Billing Setting saved successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getPageSetting: async (req, res) => {
    try {
      const slugArr = ['hidePostBtn', 'hideSubscriberCount', 'emailForNewSubscriber', 'emailForComment', 'adultContent', 'googleAnalyticId'];
      const result = await settingService.getPageSetting(req.user.id, slugArr)
      return helper.apiResponse(req, res, 'OK', false, result, 'Page Setting Fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }
}
