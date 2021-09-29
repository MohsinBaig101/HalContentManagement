const { body, check, oneOf } = require('express-validator')
const _ = require('lodash')
const validation = {
  validate: (type, mode) => {
    if (type === 'text') {
      return [
        body('title', 'Title is Required Field').notEmpty().trim(),
        body('status', 'Status is Required Field').notEmpty().trim(),
        body('userAccessRule', 'Please select who can see post').custom(async (val, { req }) => {
          const value = val ? typeof val === 'object' ? val : JSON.parse(val) : {}
          if (value.whoCanSee === '') {
            throw new Error('Please select who can see post')
          }
          if (value.whoCanSee === 'tier' && (!_.isArray(value.tiers))) {
            throw new Error('Please select tiers')
          } else if (value.whoCanSee === 'tier' && (_.isArray(value.tiers) && value.tiers.length <= 0)) {
            throw new Error('Please select tiers')
          }
          return true
        }),
        body('tags').custom((value, { req }) => {
          if (value) {
            if (!_.isArray(value)) {
              throw new Error('Tags must be a Array')
            }
          }
          return true
        })
      ]
    }
    if (type === 'image') {
      return [
        body('title', 'Title is Required Field').trim().notEmpty(),
        body('status', 'Status is Required Field').trim().notEmpty(),
        body('userAccessRule', 'Please select who can see post').custom((val, { req }) => {
          const value = val ? typeof val === 'object' ? val : JSON.parse(val) : {}
          if (value.whoCanSee === '') {
            throw new Error('Please select who can see post')
          }
          if (value.whoCanSee === 'tier' && (!_.isArray(value.tiers))) {
            throw new Error('Please select tiers')
          } else if (value.whoCanSee === 'tier' && (_.isArray(value.tiers) && value.tiers.length <= 0)) {
            throw new Error('Please select tiers')
          }
          return true
        }),
        body('images').custom((value, { req }) => {
          if (_.isArray(value) && value.length > 0) {
            return true
          } else {
            throw new Error('Images is required')
          }
        }),
        body('tags').custom((value, { req }) => {
          if (value) {
            if (!_.isArray(value)) {
              throw new Error('Tags must be a Array')
            }
          }
          return true
        })
      ]
    }
    if (type === 'audio') {
      return [
        body('title', 'Title is Required Field').trim().notEmpty(),
        body('status', 'Status is Required Field').trim().notEmpty(),
        body('userAccessRule', 'Please select who can see post').custom((val, { req }) => {
          const value = val ? typeof val === 'object' ? val : JSON.parse(val) : {}
          if (value.whoCanSee === '') {
            throw new Error('Please select who can see post')
          }
          if (value.whoCanSee === 'tier' && (!_.isArray(value.tiers))) {
            throw new Error('Please select tiers')
          } else if (value.whoCanSee === 'tier' && (_.isArray(value.tiers) && value.tiers.length <= 0)) {
            throw new Error('Please select tiers')
          }
          return true
        }),
        body('audios').custom((value, { req }) => {
          if (_.isArray(value) && value.length > 0) {
            return true
          } else {
            throw new Error('Audios is required')
          }
        }),
        body('artImage').custom((value, { req }) => {
          if (_.isArray(value) && value.length > 0) {
            return true
          } else {
            throw new Error('Art Image is required')
          }
        }),
        body('tags').custom((value, { req }) => {
          if (value) {
            if (!_.isArray(value)) {
              throw new Error('Tags must be a Array')
            }
          }
          return true
        })
      ]
    }
    if (type === 'video') {
      return [
        body('title', 'Title is Required Field').trim().notEmpty(),
        body('status', 'Status is Required Field').trim().notEmpty(),
        body('userAccessRule', 'Please select who can see post').custom((val, { req }) => {
          const value = val ? typeof val === 'object' ? val : JSON.parse(val) : {}
          if (value.whoCanSee === '') {
            throw new Error('Please select who can see post')
          }
          if (value.whoCanSee === 'tier' && (!_.isArray(value.tiers))) {
            throw new Error('Please select tiers')
          } else if (value.whoCanSee === 'tier' && (_.isArray(value.tiers) && value.tiers.length <= 0)) {
            throw new Error('Please select tiers')
          }
          return true
        }),
        body('video').custom((value, { req }) => {
          if (_.isArray(value) && value.length > 0) {
            return true
          } else {
            throw new Error('Video is required')
          }
        }),
        body('tags').custom((value, { req }) => {
          if (value) {
            if (!_.isArray(value)) {
              throw new Error('Tags must be a Array')
            }
          }
          return true
        })
      ]
    }
  }
}
module.exports = validation.validate
