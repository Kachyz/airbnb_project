const mongoose = require('mongoose');

const Homes = mongoose.model('Homes', {
    title: String,
    address: String,
    capacity: Number,
    lat: Number,
    long: Number,
    type: String,
    price: Number,
    description: String,
    user_id: {
        type: mongoose.Schema.ObjectId, 
        ref: 'def'
    },
    services: [String],
    beds: Number,
    datesNotAvailable: [Date],
    city: String
})

module.exports = Homes;

