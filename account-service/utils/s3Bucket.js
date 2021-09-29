const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const s3 = initS3Connection()
const s3Bucket = {
  upload: (fileFilter) => multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_Bucket,
      // acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    }),
    fileFilter: fileFilter || function (req, file, cb) { return cb(null, true) }
  })
}
const getSignedURLOfFile = async (fileNameOnBucket) => {
  const bucketName = process.env.AWS_Bucket
  return await s3.getSignedUrl('getObject', { Bucket: bucketName, Key: fileNameOnBucket })
}
const deleteFile = async (fileNameOnBucket) => {
  const bucketName = process.env.AWS_Bucket
  return s3.deleteObject({ Bucket: bucketName, Key: fileNameOnBucket }).promise()
}
function initS3Connection () {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: 'v4',
    region: 'us-east-2'
  })
  return s3
}
module.exports = {
  s3Bucket,
  getSignedURLOfFile,
  deleteFile
}
