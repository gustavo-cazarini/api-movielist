const express = require('express');
const Movie = require('../Controller/Movie');
const Genre = require('../Controller/Genre');
const Image = require('../Controller/Image');
const { uploadPoster, uploadImage } = require('../Controller/Upload');
const router = express.Router();

router.get('/api/movie', Movie.getAll);
router.post('/api/movie', uploadPoster.single("poster"), Movie.create);
router.put('/api/movie', uploadPoster.single("poster"), Movie.update);
router.delete('/api/movie/:id', Movie.remove);

router.get('/api/genre', Genre.getAll);
router.post('/api/genre', Genre.create);
router.put('/api/genre/:id', Genre.update);
router.delete('/api/genre/:id', Genre.remove);

router.get('/api/image', Image.getAll);
router.post('/api/image', uploadImage.array("image"), Image.create);

module.exports = router;