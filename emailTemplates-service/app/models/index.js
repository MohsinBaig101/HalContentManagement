const db = require('../../config/connectDatabase')
db.emailTemplateModal = require('./EmailTemplate.modal')(db)
module.exports = db
