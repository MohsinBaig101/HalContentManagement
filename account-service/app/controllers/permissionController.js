const permissionService = require('../services/permissionService')
module.exports = {
  // Retrieve and return records from the database.
  /**
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
  insertPermissionBulk: async (req, res, next) => {
    try {
      const permissions = req.body.permissions
      const result = await permissionService.insertPermissionBulk(permissions)
      return Helper.apiResponse(req, res, 200, false, result, 'message')
    } catch (err) {
      return Helper.apiResponse(req, res, 400, true, err, 'Error')
    }
  }

}
