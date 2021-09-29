const roleService = require('../services/roleService')
module.exports = {
  // Retrieve and return records from the database.
  /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
  insertRole: async (req, res, next) => {
    try {
      const roles = req.body.roles
      const result = await roleService.insertRole(roles)
      return Helper.apiResponse(req, res, 200, true, result, 'message')
    } catch (err) {
      return Helper.apiResponse(req, res, 400, false, err, 'Error')
    }
  },
  getRole: async (req, res, next) => {
    try {
      const result = await roleService.getRole()
      return Helper.apiResponse(req, res, 200, true, result, 'message')
    } catch (err) {
      return Helper.apiResponse(req, res, 400, false, err, 'Error')
    }
  }

}
