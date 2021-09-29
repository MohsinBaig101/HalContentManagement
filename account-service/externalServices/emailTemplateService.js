const fetch = require('node-fetch')
module.exports = {
  registerUserEmail: async (data) => {
    await fetch(`${process.env.EMAIL_TEMPLATE_SERVICE_URL}/register/email-send`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  forgotPasswordEmail: async (user) => {
    fetch(`${process.env.EMAIL_TEMPLATE_SERVICE_URL}/reset-password/email-send`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  resetTokenEmail: async (result) => {
    fetch(`${process.env.EMAIL_TEMPLATE_SERVICE_URL}/reset-password/email-send-otp`, {
      method: 'POST',
      body: JSON.stringify(result.data),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
