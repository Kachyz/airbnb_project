const mongoose = require('mongoose')
const environment = process.env.NODE_ENV || 'development'

const config = {
  development: 'mongodb://db/myapp',
  test: 'mongodb://db/test',
  production: process.env.DB_URL
}

mongoose.connect(config[environment])

module.exports = mongoose