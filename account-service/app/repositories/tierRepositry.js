const { UserTier, TierSubscription, User } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  createTier: async (data) => {
    await UserTier.create({
      title: data.title,
      price: data.price,
      image: data.image,
      description: data.description,
      status: data.status,
      benefits: data.benefits,
      UserId: data.userId
    })
  },
  getTierByUserId: async (userId) => {
    return await UserTier.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'desc']],
      attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
    })
  },
  getSpecificUserTier: async (tierId, userId) => {
    return await UserTier.findOne({
      where: {
        [Op.and]: {
          id: tierId,
          UserId: userId
        }
      }
    })
  },
  updateTier: async (data) => {
    const tierObj = await UserTier.findOne({
      where: { id: data.tierId }
    })
    tierObj.title = data.title
    tierObj.price = data.price
    tierObj.description = data.description
    tierObj.status = data.status
    tierObj.benefits = data.benefits
    if (data.imageUpdateFlag === 'true') {
      tierObj.image = data.image
    }
    return await tierObj.save()
  },
  subscribedTier: async (tierId, userId) => {
    return await TierSubscription.create({
      tierId: tierId,
      userId: userId,
      status: 'active'
    })
  },
  getSubscribedTiers: async (userId) => {
    return await User.findOne({
      where: {
        id: userId
      },
      attributes: [],
      include: {
        model: UserTier,
        as: 'userTierSubscribe',
        attributes: ['title', 'price', 'image', 'description', 'benefits', 'UserId'],
        through: {
          attributes: []
        }
      }
    })
  },
  getUserTiers: async (userId) => {
    return await UserTier.findAll({
      attributes: ['title', 'price', 'image', 'description', 'benefits'],
      where: {
        [Op.and]: {
          UserId: userId,
          status: 'active'
        }
      }
    })
  },
  fanSubscribedCreatorTier: async (tiers,userId) => {
    return await TierSubscription.findAll({
      where :{
        [Op.and]:{
          UserId:userId,
          tierId : tiers
        }
      }
    })
  }
}
