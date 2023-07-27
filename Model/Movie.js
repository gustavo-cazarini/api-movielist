const { Movie } = require('../Class/Movie');

const getAll = async () => await new Movie().get();

const create = async (data, file) => {
    const { title, plot, year, runtime, imdbRating } = data.body;
    const poster = file.filename;
    return await new Movie(null, title, plot, year, runtime, imdbRating, poster).post();
}

const update = async (data, file) => {
    const { id, title, plot, year, runtime, imdbRating } = data.body;
    const poster = file?.filename;

    const movieToUpdate = new Movie(id, title, plot, year, runtime, imdbRating, poster);

    if (title || file) {
        let fields = ['title'];
        if (file) fields.push('poster');

        const getData = await new Movie().get(fields, id);
        let originalTitle = null, originalFilename = null;

        if (getData?.length) {
            if (getData[0].title) originalTitle = getData[0].title;
            if (getData[0].poster) originalFilename = getData[0].poster;
        } else console.log('Error while getting the data');

        let fs = require('fs');
        if (title) {
            if (fs.existsSync(`./Images/${originalTitle}`)) {
                fs.renameSync(`./Images/${originalTitle}`, `./Images/${title}`);
            }
        }
        if (file) {
            if (fs.existsSync(`./Images/${title ? title : originalTitle}/${originalFilename}`)) {
                fs.unlinkSync(`./Images/${title ? title : originalTitle}/${originalFilename}`);
            }
        }
    }

    return await movieToUpdate.put();
}

module.exports = {
    getAll,
    create,
    update,
};