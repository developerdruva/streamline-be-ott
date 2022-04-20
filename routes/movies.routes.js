const express = require('express');
const router = express.Router();

const movies = require('../controllers/movies.controller');

router.post('/addmovie', movies.addMovie);
router.get('/getmovies', movies.getMovies);
router.post('/getmoviebyid/:id', movies.getMoviebyId);
router.put('/updatemoviebyid', movies.updateMovie);
router.delete('/deletemoviebyid/:id', movies.deleteMovie);
router.put('/setpromo/:id', movies.setPromo);
router.put('/unsetpromo/:id', movies.unsetPromo);


module.exports = router