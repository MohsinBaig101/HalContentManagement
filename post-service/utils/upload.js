const multer = require('multer')

module.exports = (fileFilter) => {
  console.log(fileFilter)
  return {
    uploadDoc: multer({
      storage: multer.diskStorage({
        destination: 'post-service/uploads',
        filename: function (req, file, cb) {
          cb(null, new Date().toISOString() + '-' + file.originalname)
        }
      }),
      fileFilter: fileFilter || function (req, file, cb) { return cb(null, true) }
    })
  }
}
