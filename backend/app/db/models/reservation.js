const mongoose = require('mongoose');

const Reservations = mongoose.model('Reservations', {
  date: [Date],
  home_id: {
      type: mongoose.Schema.ObjectId, 
      ref: 'def'
  },
  guest_id: {
      type: mongoose.Schema.ObjectId, 
      ref: 'def'
  }
})

module.exports = Reservations;