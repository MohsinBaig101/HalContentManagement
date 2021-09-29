const { Role } = require('../models')
module.exports = {
  insertRole: async (roles) => {
    // try {
    //   // await Role.deleteMany({});
    //   const res = await Role.insertMany(roles)
    //   return res
    // } catch (err) {
    //   return err
    // }
  },
  getRoleId: async (slug) => {
    const role = await Role.findOne({ where: { slug: slug } })
    if (role) {
      return role.id
    } else {
      return 0
    }
  }
}
