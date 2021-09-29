const { emailTemplateModal } = require('../models')

const parseRegisterEmail = (emailContent, user) => {
  let stripedHtml = ''
  emailContent = emailContent.replace(/\[[user.firstName\]]*\]/g, user.firstName)
  emailContent = emailContent.replace(/\[[user.lastName\]]*\]/g, user.lastName)
  emailContent = emailContent.replace(/\[[user.email\]]*\]/g, user.email)
  emailContent = emailContent.replace(/\[[user.emailToken\]]*\]/g, user.emailToken)
  emailContent = emailContent.replace(/\[[resetTokenLink\]]*\]/g, process.env.FRONT_END_URL + 'auth/verify-forgot-password-link?token=' + user.resetToken)
  emailContent = emailContent.replace(/\[[user.resetToken\]]*\]/g, user.resetToken)
  stripedHtml = emailContent
  return stripedHtml
}
const getEmailContent = async (templateKey, user) => {
  const emailObj = await emailTemplateModal.findOne({ where: { templateKey: templateKey } })
  if (emailObj) {
    const content = parseRegisterEmail(emailObj.content, user)
    return {
      emailObj: emailObj,
      content: content
    }
  }
}
module.exports = {
  parseRegisterEmail: parseRegisterEmail,
  getEmailContent: getEmailContent
}
