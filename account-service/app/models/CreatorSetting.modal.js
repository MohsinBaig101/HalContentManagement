const { DataTypes } = require('sequelize')
module.exports = (db) => {
    const CreatorSetting = db.sequelize.define('creatorSettings', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            modelName: 'creatorSettings',
            tableName: 'creatorSettings'
        })
    return CreatorSetting
}
