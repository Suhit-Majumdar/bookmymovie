

const mongoose = require('mongoose');

const hallMovieSchema = new mongoose.Schema({
    movieName: String,
    cinemahall: {
        city: String,
        hallname: String,
        screenName: String
    },
    startDate: Date,
    endDate: Date,
    noOfRemainingSeats: [
        {
            date: Date,
            seats: Number
        }
    ]
});
const hallmovie = mongoose.model('hallmovie', hallMovieSchema);

module.exports.hallmovie = hallmovie;