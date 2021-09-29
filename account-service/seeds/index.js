const RolesSeeder = require('./Roles')
const PermissionSeeder = require('./Permissions')
const UserSeeder = require('./User');

(async function seeders () {
  try {
    await Promise.all([RolesSeeder.insertRole(), PermissionSeeder.permissionsBulk(), UserSeeder.createSuperAdmin()])
    console.log(
      '--- Roles created successfully ---: ',
      '--- Permissions created successfully ---: ',
      '--- SuperUser Account created successfully ---: '
    )
  } catch (e) {
    console.log('--- Something went wrong while creating Roles ---: ', e.message)
  }
}())
