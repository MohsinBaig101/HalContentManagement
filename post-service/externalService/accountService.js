const fetch = require('node-fetch')
module.exports = {
  getUserTier: async (token) => {
    try {
      const tiersObj = await fetch(`${process.env.ACCOUNT_SERVICE_URL}users/tiers/get`, {
        method: 'GET',
        // body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`
        }
      })
      return tiersObj.json()
    } catch (err) {
      return err
    }
  },
  getSubscribedTiers: async (token) => {
    try {
      const tiersObj = await fetch(`${process.env.ACCOUNT_SERVICE_URL}users/tiers/subscribed/all`, {
        method: 'GET',
        // body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`
        }
      })
      return tiersObj.json()
    } catch (err) {
      return err
    }
  },
  checkFanSubscribedCreatorTier: async (token,tierArr) => {
    try {
      const tiersObj = await fetch(`${process.env.ACCOUNT_SERVICE_URL}users/tiers/fanSubscribedCreatorTiers`, {
        method: 'POST',
        body: JSON.stringify(tierArr),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`
        }
      })
      return tiersObj.json()
    } catch (err) {
      return err
    }
  }
}
