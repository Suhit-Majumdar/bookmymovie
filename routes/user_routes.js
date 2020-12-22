


var express = require('express');
var router = express.Router();


var user = require('../db_schemas/user_schema').user;
var verifyToken = require('../middlewares/authJwt').verifyToken;

// router.get('/', function(req, res) {
//     user.find(function(err, users) {
//         if(err) {
//             res.send(err);
//         } else {
//             res.json(users);
//         }
//     });
// });

// get details of a user
router.get('/', [verifyToken], function(req, res) {
    // user.findOne({email: req.params['username']}, function(err, user) {
    user.findOne({email: req.username}, function(err, user) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json({
                email : user.email,
                firstname : user.firstname,
                lastname : user.lastname,
                mobileno : user.mobileno,
                location : user.location
            });
        }
    });
});



// router.post('/', function(req, res) {

//     var userInstance = new user(req.body);
        
        
//     userInstance.save(function (err, userins) {
//         if (err) 
//             res.send(err);
//         else
//             res.status(200).send('User added successfully');
//       });
// });

// update details of a user
router.put('/', [verifyToken], function(req, res) {
    var userInstance = {};
    if(req.body.firstname)
        userInstance.firstname = req.body.firstname;
    if(req.body.lastname)
        userInstance.lastname = req.body.lastname;
    if(req.body.mobileno)
        userInstance.mobileno = req.body.mobileno;
    if(req.body.location)
        userInstance.location = req.body.location;
     
    // {firstname : req.body.firstname, lastname: req.body.lastname, mobileno: req.body.mobileno, location: req.body.location}    
    user.findOneAndUpdate({email : req.username}, userInstance, function (err, userins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'User updated successfully'});
      });
});

//delete details of a user
router.delete('/', [verifyToken], function(req, res) {        
        
    // user.findOneAndDelete( {email : req.params['username']}, function (err, movieins) {
    user.findOneAndDelete( {email : req.username}, function (err, userins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'User deleted successfully'});
      });
});

module.exports = router;