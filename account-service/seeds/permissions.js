const fetch = require('node-fetch')
const appConfig = require('../config/appConfig')

const permissions =
{
  permissions: [
    { name: 'Create Lead', slug: 'create_lead' },
    { name: 'Edit Lead', slug: 'edit_lead' },
    { name: 'Delete Lead', slug: 'delete_lead' },
    { name: 'Approve Lead', slug: 'delete_lead' },
    { name: 'Declined Lead', slug: 'delete_lead' },
    { name: 'Bid on Lead', slug: 'bid_on_lead' }
  ]
}
exports.permissionsBulk = async () => {
  return fetch(`${appConfig.DEV}:${appConfig.PORT}/permission/bulk`, {
    method: 'POST',
    body: JSON.stringify(permissions),
    headers: { 'Content-Type': 'application/json' }
  })
}
