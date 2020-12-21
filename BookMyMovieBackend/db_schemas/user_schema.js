

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    mobileno: String,
    location: String
});

const user = mongoose.model('user', userSchema);

module.exports.user = user;