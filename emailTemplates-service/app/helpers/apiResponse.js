module.exports = (req, res, statusCode = 400, isErrorArray = false, data = null, message = null, version = 'v1') => {
  const statusCodeString = helper.statusCodes(statusCode)
  return res.status(statusCodeString).send({
    isErrorArray: isErrorArray,
    statusCode: statusCodeString,
    data: data,
    message: message,
    version: version
  })
}
