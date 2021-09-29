const { body } = require('express-validator')
const _ = require('lodash')
const { Op } = require('sequelize')
const { TierSubscription, UserTier } = require('../models')
const validation = {
  validate: () => {
    return [
      body('tierId').notEmpty().trim().custom(async (value, { req }) => {
        const tierObj = await TierSubscription.findOne({
          where: {
            [Op.and]: {
              tierId: value,
              userId: req.user.id
            }
          }
        })
        if (tierObj) {
          throw new Error('Tier already Subscribed')
        }
        const tier = await UserTier.findOne({
          where: {
            id: value
          }
        })
        if (tier && tier.UserId === req.user.id) {
          throw new Error('You can\'t subscribed own tier ')
        } else if (!tier) {
          throw new Error('Incorrect Tier Id ')
        }
        return true
      })
    ]
  }
}
module.exports = validation.validate
