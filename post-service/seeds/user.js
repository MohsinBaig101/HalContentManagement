const fetch = require('node-fetch')
const appConfig = require('../config/appConfig')
const user = { user: { name: 'Super Admin', email: 'super@admin.com', password: '123456' } }
exports.createSuperAdmin = async () => {
  return fetch(`${appConfig.DEV}:${appConfig.PORT}/users/create/super-admin`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  })
}
