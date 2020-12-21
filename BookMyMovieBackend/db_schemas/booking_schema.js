

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: String,
    movieName: String,
    cinemahall: {
        city: String,
        hallname: String,
        screenName: String
    },
    bookingDate: Date,
    noOfTickets: Number,
    mobileno: String,
    emailid: String
});

const booking = mongoose.model('booking', bookingSchema);

module.exports.booking = booking;
