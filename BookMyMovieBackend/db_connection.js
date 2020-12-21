

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/capstone',{useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  console.log('Database Connection established');
});

mongoose.set('useFindAndModify', false);

module.exports = db;