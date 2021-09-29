const fs = require('fs')

module.exports = async (file) => {
  return fs.unlink(file, err => {
    if (err) {
      // throw err;
    }
  })
}
