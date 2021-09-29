// require('custom-env').env()
require('custom-env').env('staging')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// require('dotenv').config()

// create express app
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./bootstrapApplication').bootstrap(app)
// listen for requests
const port = 9002
app.listen(port, () => {
  console.log(`Hi! Server is listening on port ${port}`)
})
