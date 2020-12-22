var express = require('express');
var router = express.Router();

const movie = require('../db_schemas/movie_schema').movie;
const isAdmin = require('../middlewares/authJwt').isAdmin;

// const getMovies = require('../services/movie_service').getMovies;

// const movie_controller = require('../controllers/movie_controller');

// router.get('/',movie_controller.getMovies);


//get movies
router.get('/', function(req, res) {
    movie.find(function(err, movies) {
        if(err) {
            res.status(500).send({message : err});
            return;
        } else {
            return res.status(200).json(movies);
        }
    });
});


//add a movie
router.post('/', [isAdmin], function(req, res) {

    movie.findOne({movieName : req.body.movieName} , function(err, movieins) {
        if(err) {
            res.status(500).send({message : err});
            return;
        }

        if(movieins) {
            return res.status(400).send({message : "Movie already exists" });
        } else {
            var movieInstance = new movie(req.body);
            
            
            movieInstance.save(function (err, movieins) {
                if (err) 
                    res.status(500).send({message : err});
                else
                    res.status(200).send({message : 'Movie added successfully'});
            });
        }
    }); 
});


//update a movie
router.put('/', [isAdmin], function(req, res) {
    var movieInstance = {};

    if(req.body.movieDescription)
        movieInstance.movieDescription = req.body.movieDescription;
    if(req.body.movie_poster)
        movieInstance.movie_poster = req.body.movie_poster;
    if(req.body.language)
        movieInstance.language = req.body.language;
    if(req.body.director)
        movieInstance.director = req.body.director;
    if(req.body.releaseDate)
        movieInstance.releaseDate = req.body.releaseDate;
    if(req.body.genre)
        movieInstance.genre = req.body.genre;
    if(req.body.certificate)
        movieInstance.certificate = req.body.certificate;
    if(req.body.cast)
        movieInstance.cast = req.body.cast.slice();
    if(req.body.genre)
        movieInstance.genre = req.body.genre.slice();


    movie.findOneAndUpdate({movieName : req.body.movieName}, movieInstance, function (err, movieins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'Movie updated successfully'});
      });
});

// delete a movie
router.delete('/:movieName', [isAdmin], function(req, res) {   
        
    movie.findOneAndDelete( {movieName : req.params['movieName']} , function (err, movieins) {
        if (err) 
            res.status(500).send({message : err});
        else
            res.status(200).send({message : 'Movie deleted successfully'});
      });
});

module.exports = router;