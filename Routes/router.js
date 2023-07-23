const express = require('express');
const Movie = require('../Controller/Movie');
const router = express.Router();

router.get('/api/movie', Movie.getAll);

module.exports = router;