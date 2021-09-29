const multer = require('multer')
const path = require('path')
module.exports = (fileFilter) => {
  return {
    uploadDoc: multer({
      storage: multer.diskStorage({
        destination: path.join(__dirname, '../uploads/'),
        filename: function (req, file, cb) {
          cb(null, new Date().toISOString() + '-' + file.originalname)
        }
      }),
      fileFilter: fileFilter || function (req, file, cb) { return cb(null, true) }
    })
  }
}
