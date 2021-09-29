const fetch = require('node-fetch')
const appConfig = require('../config/appConfig')

const roles =
{
  roles: [
    { name: 'Super Admin', slug: 'super-admin', permissions: [] },
    { name: 'Operation', slug: 'operation', permissions: [] },
    { name: 'Resource', slug: 'resource', permissions: [] }
  ]
}
exports.insertRole = async () => {
  return fetch(`${appConfig.DEV}:${appConfig.PORT}/role/insertRoles`, {
    method: 'POST',
    body: JSON.stringify(roles),
    headers: { 'Content-Type': 'application/json' }
  })
}
