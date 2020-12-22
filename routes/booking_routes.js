

var express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authJWT');
var router = express.Router();


var booking = require('../db_schemas/booking_schema').booking;

//find bookings of a user
router.get('/', [verifyToken] , function(req, res) {
    // booking.find({email : req.params['username']},function(err, bookings) {
    booking.find({email : req.username},function(err, bookings) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json(bookings);
        }
    });
});

router.get('/all', [isAdmin], function(req, res) {
    booking.find(function(err, bookings) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json(bookings);
        }
    });
});

router.post('/', [verifyToken], function(req, res) {

    var bookingInstance = new booking(req.body);
        
        
    bookingInstance.save(function (err, bookingins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'Booking done successfully'});
      });
});

module.exports = router;