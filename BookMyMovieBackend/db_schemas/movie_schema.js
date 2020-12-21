

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: String,
    movieDescription: String,
    movie_poster: String,
    language: String,
    director: String,
    cast: [{name: String, image_url: String}],
    releaseDate: {type: Date},
    genre: [String],
    certificate: String
});

const movie = mongoose.model('movie', movieSchema);

module.exports.movie = movie;