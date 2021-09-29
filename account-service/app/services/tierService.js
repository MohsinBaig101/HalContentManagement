const tierRepositry = require('../repositories/tierRepositry')
const { deleteFile } = require('../../utils/s3Bucket')

module.exports = {
  saveTier: async (data) => {
    return await tierRepositry.createTier(data)
  },
  getUserTiers: async (userId) => {
    return await tierRepositry.getTierByUserId(userId)
  },
  getTierById: async (tierId, userId) => {
    return await tierRepositry.getSpecificUserTier(tierId, userId)
  },
  updateTier: async (data) => {
    const tierObj = await tierRepositry.getSpecificUserTier(data.tierId, data.userId)
    if (tierObj) {
      if (data.imageUpdateFlag === 'true') {
        deleteFile(tierObj.image)
      }
      await tierRepositry.updateTier(data)
      return {
        status: true
      }
    } else {
      return {
        status: false
      }
    }
  },
  tierSubscribed: async (tierId, userId) => {
    return await tierRepositry.subscribedTier(tierId, userId)
  },
  getSubscribedTiers: async (userId) => {
    return await tierRepositry.getSubscribedTiers(userId)
  },
  fanSubscribedCreatorTier: async (tiers, userId) => {
    return await tierRepositry.fanSubscribedCreatorTier(tiers, userId)
  }
}
