const jwt = require('jsonwebtoken')
module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const { token } = req.headers
      if (!token) return helper.apiResponse(req, res, 'UNAUTHORIZED', true, null, 'Expected a bearer token')
      const [authType, auth] = token.trim().split(' ')
      if (authType !== 'Bearer') return helper.apiResponse(req, res, 'UNAUTHORIZED', true, null, 'Expected a bearer token')

      jwt.verify(auth, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) return helper.apiResponse(req, res, 'UNAUTHORIZED', true, null, err, true)
        if (decoded.loggedInUser) {
          req.user = decoded.loggedInUser
          next()
        } else {
          return helper.apiResponse(req, res, 'UNAUTHORIZED', true, null, 'Invalid Token')
        }
      })
    } catch (error) {
      return helper.apiResponse(req, res, 'UNAUTHORIZED', true, null, error, true)
    }
  }
}
