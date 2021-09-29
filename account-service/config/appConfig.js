module.exports = {
  PORT: process.env.PORT || 9001,
  DEV: process.env.DEV || 'http://localhost',
  DEFAULT_PROFILE: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png',
  FRONDEND_DEV: process.env.FRONTEND_DEV || 'http://localhost:3000/',
  STATUS_CODES: {
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    FORBIDEDEN: 403,
    UNAUTHORIZED: 401,
    CREATED: 201,
    VALIDATION_ERR: 422
  }
}
