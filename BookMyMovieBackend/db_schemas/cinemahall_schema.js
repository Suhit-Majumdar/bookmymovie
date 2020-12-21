

const mongoose = require('mongoose');

const cinemahallSchema = new mongoose.Schema({
    city: String,
    hallname: String,
    screenName: String,
    totalSeats: Number
});

const cinemahall = mongoose.model('cinemahall', cinemahallSchema);

module.exports.cinemahall = cinemahall;