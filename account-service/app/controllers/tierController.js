const tierService = require('../services/tierService')
module.exports = {
  createTier: async (req, res, next) => {
    try {
      const data = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
        image: req.file.key,
        benefits: req.body.benefits,
        userId: req.user.id
      }
      await tierService.saveTier(data)
      return helper.apiResponse(req, res, 'CREATED', false, null, 'Tier created successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getTiers: async (req, res, next) => {
    const userId = req.user.id
    try {
      const userTiers = await tierService.getUserTiers(userId)
      const result = await helper.getSignedUrl(userTiers, 'image', true)
      return helper.apiResponse(req, res, 'OK', false, result, 'Tiers fetched successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getTierById: async (req, res, next) => {
    const tierId = req.params.id
    try {
      const tierObj = await tierService.getTierById(tierId, req.user.id)
      if (tierObj) {
        const result = await helper.getSignedUrl(tierObj, 'image', false)
        return helper.apiResponse(req, res, 'OK', false, result, 'Tier fetched successfully')
      } else {
        return helper.apiResponse(req, res, 'OK', false, null, 'Tier Id is incorrect')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  updateTier: async (req, res, next) => {
    const data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      benefits: req.body.benefits,
      userId: req.user.id,
      imageUpdateFlag: req.body.imageUpdateFlag,
      image: req.file ? req.file.key : null,
      tierId: req.body.tierId
    }
    try {
      const tierObj = await tierService.updateTier(data)
      if (tierObj.status) {
        return helper.apiResponse(req, res, 'OK', false, null, 'Tier update successfully')
      } else {
        return helper.apiResponse(req, res, 'OK', false, null, 'Tier Id is incorrect')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  tierSubscription: async (req, res, next) => {
    const tierId = req.body.tierId
    try {
      await tierService.tierSubscribed(tierId, req.user.id)
      return helper.apiResponse(req, res, 'OK', false, null, 'Tier Subscribed Successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  getSubscibedTiers: async (req, res, next) => {
    try {
      const subscribedTiers = await tierService.getSubscribedTiers(req.user.id)
      let resultObj = { userTierSubscribe: [] };
      if (subscribedTiers && subscribedTiers.userTierSubscribe && subscribedTiers.userTierSubscribe.length > 0) {
        resultObj.userTierSubscribe = await helper.getSignedUrl(subscribedTiers.userTierSubscribe, 'image', true)
      }
      return helper.apiResponse(req, res, 'OK', false, resultObj, 'Fetch Subscribed Tiers Successfully')
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  },
  fanSubscribedCreatorTier: async (req, res) => {
    try {
      const tiers = req.body.tiers
      const userId = req.user.id
      const result = await tierService.fanSubscribedCreatorTier(tiers, userId)
      if (result.length > 0) {
        // let resultObj = await helper.getSignedUrl(result,'image')
        return helper.apiResponse(req, res, 'OK', false, result, 'Fan Subscribed Creator Tier')
      } else {
        return helper.apiResponse(req, res, 'OK', true, null, 'Fan didn\'t subscribed creator tier')
      }
    } catch (err) {
      return helper.apiResponse(req, res, 'INTERNAL_SERVER_ERROR', true, null, err, true)
    }
  }
}
