const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_dialect,
  operatorsAliases: false,
  port: process.env.DB_PORT,
  pool: {
    max: +'process.env.DB_Pool_max' || 1,
    min: +'process.env.DB_Pool_min' || 0,
    acquire: process.env.DB_Pool_acquire,
    idle: process.env.DB_Pool_idle
  }
})

const db = {}
console.log(sequelize)
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = db

// const mongoose = require('mongoose')

// exports.bootstrap = async () => {
//   const connectionString = process.env.DB_HOST
//   try {
//     return await mongoose.connect(connectionString, {
//       dbName: process.env.DBName,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true
//     })
//   } catch (e) {
//     throw new Error('Database is not connect on given string >> ' + connectionString)
//   }
// }
