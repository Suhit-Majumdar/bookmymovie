

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String
});

const admin = mongoose.model('admin', adminSchema);

module.exports.admin = admin;