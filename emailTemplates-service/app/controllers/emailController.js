const emailService = require('../services/emailService')
const email = require('../mails/Email')
module.exports = {
  sendRegisterEmail: async (req, res, next) => {
    const obj = await emailService.getEmailContent(2, req.body)
    email.sendMail(
      next,
      obj.emailObj.senderEmail,
      req.body.email,
      obj.emailObj.subject,
      obj.emailObj.description,
      obj.content
    )
  },
  sendResetEmail: async (req, res, next) => {
    const obj = await emailService.getEmailContent(3, req.body)
    email.sendMail(
      next,
      obj.emailObj.senderEmail,
      req.body.email,
      obj.emailObj.subject,
      obj.emailObj.description,
      obj.content
    )
  },
  sendResetEmailOTP: async (req, res, next) => {
    const obj = await emailService.getEmailContent(4, req.body)
    email.sendMail(
      next,
      obj.emailObj.senderEmail,
      req.body.email,
      obj.emailObj.subject,
      obj.emailObj.description,
      obj.content
    )
  }
}
