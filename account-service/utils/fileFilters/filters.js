const profileImageFilter = function fileFilter (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only images are allowed!'), false)
  }
  cb(null, true)
}
const audioFilter = function fileFilter (req, file, cb) {
  const extension = file.mimetype.split('/')[0]
  if (extension !== 'audio') {
    return cb(new Error('Only Audio files are allowed'), false)
  }
  cb(null, true)
}
const videoFilter = function fileFilter (req, file, cb) {
  const extension = file.mimetype.split('/')[0]
  if (extension !== 'video') {
    return cb(new Error('Only Video file allowed'), false)
  }
  cb(null, true)
}
module.exports = {
  profileImageFilter: profileImageFilter,
  audioFilter: audioFilter,
  videoFilter: videoFilter
}
