const mainConfig = require('../../config/mail')

// async..await is not allowed in global scope, must use a wrapper
function sendMail (next, from, to, subject, text, html) {
  const info = mainConfig.transporter.sendMail({
    from: `<${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html
  }, function (err) {
    console.log(err + '123')
  })
  next()
}
module.exports = {
  sendMail: sendMail
}
