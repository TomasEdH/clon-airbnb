const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required:true},
    place: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    price: Number
})

const BookingModel = mongoose.model('Booking', BookingSchema)
module.exports = BookingModel