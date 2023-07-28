const express = require('express');
const Movie = require('../Controller/Movie');
const { uploadPoster } = require('../Controller/Upload');
const router = express.Router();

router.get('/api/movie', Movie.getAll);
router.post('/api/movie', uploadPoster.single("poster"), Movie.create);
router.put('/api/movie', uploadPoster.single("poster"), Movie.update);
router.delete('/api/movie/:id', Movie.remove);

module.exports = router;