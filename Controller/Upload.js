const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { title } = require('process');
const { Movie } = require('../Class/Movie');

const posterMulterStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let { title } = req.body;
        let id;
        if (!title) {
            id = req.body.id;
            title = await new Movie(id).get(['title'], id);
        }

        const path = `./Image/${title}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `poster-${Date.now()}` + path.extname(file.originalname));
    },
});

const imageMulterStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { movieId } = req.body;
        let title = await new Movie(movieId).get(['title'], movieId);
        title = title[0].title;
        if (!title) return false;
        const path = `./Image/${title}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}` + path.extname(file.originalname));
    },
});

const multerFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error("Please upload a image"));
    }
    cb(null, true);
};

const uploadPoster = multer({
    storage: posterMulterStorage,
    fileFilter: multerFilter,
});

const uploadImage = multer({
    storage: imageMulterStorage,
    fileFilter: multerFilter,
});

module.exports = { uploadPoster, uploadImage };