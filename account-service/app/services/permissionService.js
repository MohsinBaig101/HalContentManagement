const Permission = require('../models/Permission.modal')
module.exports = {
  insertPermissionBulk: async (permissions) => {
    try {
      // await Role.deleteMany({});
      const res = await Permission.insertMany(permissions)
      return res
    } catch (err) {
      return err
    }
  }
}
