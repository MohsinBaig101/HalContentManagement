const appConfig = require('../config/appConfig')

module.exports = {
  getGravatar: async (emailHash) => {
    return await fetch(`${process.env.GRAVATAR_URL}${emailHash}?d=${appConfig.DEFAULT_PROFILE}`, {
      method: 'GET',
      // body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
