const express = require('express');
const Movie = require('../Controller/Movie');
const Genre = require('../Controller/Genre');
const { uploadPoster } = require('../Controller/Upload');
const router = express.Router();

router.get('/api/movie', Movie.getAll);
router.post('/api/movie', uploadPoster.single("poster"), Movie.create);
router.put('/api/movie', uploadPoster.single("poster"), Movie.update);
router.delete('/api/movie/:id', Movie.remove);

router.get('/api/genre', Genre.getAll);

module.exports = router;