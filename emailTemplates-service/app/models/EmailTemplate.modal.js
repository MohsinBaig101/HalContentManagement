const { Sequelize, DataTypes } = require('sequelize')
module.exports = (db) => {
  const emailTemplate = db.sequelize.define('emailTemplate', {
    // Model attributes are defined here
    templateName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    templateKey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    modelName: 'emailTemplate',
    tableName: 'emailTemplates'
  })
  return emailTemplate
}
