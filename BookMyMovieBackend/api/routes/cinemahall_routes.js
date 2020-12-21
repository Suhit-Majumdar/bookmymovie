

var express = require('express');
const { isAdmin } = require('../middlewares/authJWT');
var router = express.Router();


var cinemhall = require('../db_schemas/cinemahall_schema').cinemahall;

router.get('/', function(req, res) {
    cinemahall.find(function(err, cinemahalls) {
        if(err) {
            res.send(err);
        } else {
            res.json(cinemahalls);
        }
    });
});

router.post('/', [isAdmin], function(req, res) {

    var cinemahallInstance = new cinemhall(req.body);
        
        
    cinemahallInstance.save(function (err, cinemahallins) {
        if (err) 
            res.send(err);
        else
            res.status(200).send('Cinemahall added successfully');
      });
});

router.put('/', [isAdmin], function(req, res) {
    var cinemahallInstance = {};
    if(req.body.city)
        cinemahallInstance.city = req.body.city;
    if(req.body.hallname)
        cinemahallInstance.hallname = req.body.hallname;
    if(req.body.screenName)
        cinemahallInstance.screenName = req.body.screenName;
    if(req.body.totalSeats)
        cinemahallInstance.totalSeats = req.body.totalSeats;

    var query = {}
    query.city = req.query.city;
    query.hallname = req.query.hallname;
    query.screenName = req.query.screenName;
    // console.log(query);
    //{city: req.query.city, hallname: req.query.hallname, screenName: req.query.screenName}

    cinemhall.findOneAndUpdate(query, cinemahallInstance, function (err, cinemahallins) {
        if (err) 
            res.send(err);
        else
            res.status(200).send('Cinemahall updated successfully');
      });
});

router.delete('/',[isAdmin], function(req, res) {   
    
    var query = {}
    query.city = req.query.city;
    query.hallname = req.query.hallname;
    query.screenName = req.query.screenName;
        
    cinemhall.findOneAndDelete(query, function (err, cinemahallins) {
        if (err) 
            res.send(err);
        else
            res.status(200).send('Cinemahall deleted successfully');
      });
});

module.exports = router;