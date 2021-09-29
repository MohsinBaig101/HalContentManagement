const imageFilter = function fileFilter (req, file, cb) {
  // accept image only
  // if (file.fieldname === 'images' && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed! allowed file extentions jpg,jpeg,png,gif '), false)
  }
  cb(null, true)
}
const audioFilter = function fileFilter (req, file, cb) {
  const extension = file.mimetype.split('/')[0]
  // if (file.fieldname === 'audios' && extension !== 'audio') {
  if (extension !== 'audio') {
    return cb(new Error('Only Audio files are allowed'), false)
  }
  cb(null, true)
}
const videoFilter = function fileFilter (req, file, cb) {
  const extension = file.mimetype.split('/')[0]
  if (file.fieldname === 'video' && extension !== 'video') {
    return cb(new Error('Only Video file allowed'), false)
  }
  cb(null, true)
}
module.exports = {
  imageFilter: imageFilter,
  audioFilter: audioFilter,
  videoFilter: videoFilter
}
