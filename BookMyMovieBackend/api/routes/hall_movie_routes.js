

var express = require('express');
const { cinemahall } = require('../db_schemas/cinemahall_schema');
const { movie } = require('../db_schemas/movie_schema');
const { isAdmin } = require('../middlewares/authJWT');
var router = express.Router();


var hallmovie = require('../db_schemas/hall_movie_schema').hallmovie;

router.get('/', function(req, res) {
    hallmovie.find(function(err, moviehalls) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json(moviehalls);
        }
    });
});

router.get('/:city', function(req, res) {
    hallmovie.find({"cinemahall.city" : req.params['city']}, function(err, moviehalls) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json(moviehalls);
        }
    });
});

router.get('/:city/:moviename', function(req, res) {
    hallmovie.find({"cinemahall.city" : req.params['city'], "movieName" : req.params['moviename']}, function(err, moviehalls) {
        if(err) {
            res.status(500).send({message : err});
        } else {
            res.json(moviehalls);
        }
    });
});

router.post('/', [isAdmin], async function(req, res) {

    var moviehallInstance = new hallmovie(req.body);

    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);
    var noOfSeats;

    console.log("StartDate : " + startDate);
    console.log("EndDate : " + endDate);
    var noOfDays = (endDate - startDate) / (1000*60*60*24);
    noOfDays++;
    // console.log(noOfDays);

    

    var cinemahallins = await cinemahall.findOne({city : req.body.cinemahall.city, hallname : req.body.cinemahall.hallname, screenName : req.body.cinemahall.screenName});
    //     , function(err,cinemahallins) {
    //     if(err) {
    //         res.status(500).send({message : err});
    //     }

        // if(cinemahallins) {
        //     console.log(cinemahallins);
        //     noOfSeats = cinemahallins.totalSeats;
        // } else {
        //     res.status(400).send({message : 'Cinemahall doesnot exist'});
        // }
        
    // });

    if(cinemahallins) {
        // console.log(cinemahallins);
        noOfSeats = cinemahallins.totalSeats;
    } else {
        res.status(400).send({message : 'Cinemahall doesnot exist'});
    }

    // console.log("no of seats : " + noOfSeats);

    var tempDate = startDate;
    for(let i=0; i<noOfDays; i++) {
        moviehallInstance.noOfRemainingSeats.push({date : new Date(tempDate), seats : noOfSeats});
        tempDate.setDate(tempDate.getDate()+1);
    }

    // console.log(moviehallInstance);
        
        
    moviehallInstance.save(function (err, moviehallins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'movie added to cinemahall successfully'});
      });
});

//write code for put 
router.put('/', [isAdmin], function(req, res) {   
    
    var query = {}
    query.city = req.query.city;
    query.hallname = req.query.hallname;
    query.screenName = req.query.screenName;

    var moviehallInstance = new hallmovie(req.body);
        
    hallmovie.findOneAndUpdate(query, function (err, cinemahallins) {
        if (err) 
            res.send(err);
        else
            res.status(200).send({message : 'movie in a hall updated successfully'});
      });
});

router.delete('/', [isAdmin], function(req, res) {   
    
    var query = {}
    query.city = req.query.city;
    query.hallname = req.query.hallname;
    query.screenName = req.query.screenName;
        
    hallmovie.findOneAndDelete(query, function (err, cinemahallins) {
        if (err) 
            res.send(err);
        else
            res.status(200).send({message : 'movie_hall deleted successfully'});
      });
});

module.exports = router;