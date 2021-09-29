module.exports = (req, res, statusCode = 400, error = false, data = null, message = null, isErrorArray = false, version = 'v1') => {
  const statusCodeString = helper.statusCodes(statusCode)
  return res.status(statusCodeString).send({
    isErrorArray: isErrorArray,
    error: error,
    statusCode: statusCodeString,
    data: data,
    message: message,
    version: version
  })
}
