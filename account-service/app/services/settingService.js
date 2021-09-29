const { CreatorSetting } = require('../models')
const { Op } = require('sequelize')

module.exports = {
    saveBillingCycle: async (data) => {
        const setting = await CreatorSetting.findOne({
            where: {
                [Op.and]: {
                    slug: 'billingCycle',
                    userId: data.userId
                }
            }
        })
        if (setting) {
            return await setting.update({
                value: data.billingCycle
            })
        } else {
            return await CreatorSetting.create({
                slug: 'billingCycle',
                value: data.billingCycle,
                userId: data.userId
            })
        }

    },
    getBillingCycle: async (userId) => {
        return await CreatorSetting.findOne({
            where: {
                [Op.and]: {
                    slug: 'billingCycle',
                    userId: userId
                }
            }
        })
    },
    savePageSetting: async (data) => {
        const setting = await CreatorSetting.findOne({
            where: {
                [Op.and]: {
                    slug: data.slug,
                    userId: data.userId
                }
            }
        })
        if (setting) {
            setting.update({
                value: data.value
            })
        } else {
            return await CreatorSetting.create({
                slug: data.slug,
                value: data.value,
                userId: data.userId
            })
        }
    },
    getPageSetting: async (userId,slugs) => {
        return await CreatorSetting.findAll({
            where: {
                [Op.and]: {
                    slug: {
                        [Op.in]: slugs
                    },
                    userId: userId
                }
            }
        })
    },
}
