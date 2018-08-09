const mongoose = require('../config')

const Users = mongoose.model('Users', {
  email: String,
  password: String
})

module.exports = Users