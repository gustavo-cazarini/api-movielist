const express = require('express');
const Movie = require('../Controller/Movie');
const { uploadPoster } = require('../Controller/Upload');
const router = express.Router();

router.get('/api/movie', Movie.getAll);
router.post('/api/movie', uploadPoster.single("poster"), Movie.create);

module.exports = router;