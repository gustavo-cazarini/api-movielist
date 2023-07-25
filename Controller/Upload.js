const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Movie } = require('../Class/Movie');

const posterMulterStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { title } = req.body;

        const path = `./Image/${title}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `poster-${Date.now()}` + path.extname(file.originalname));
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

module.exports = { uploadPoster };