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
            if (fs.existsSync(`./Image/${originalTitle}`)) {
                fs.renameSync(`./Image/${originalTitle}`, `./Image/${title}`);
            }
        }
        if (file) {
            if (fs.existsSync(`./Image/${title ? title : originalTitle}/${originalFilename}`)) {
                fs.unlinkSync(`./Image/${title ? title : originalTitle}/${originalFilename}`);
            }
        }
    }

    return await movieToUpdate.put();
}

const remove = async (data) => {
    const { id } = data.params;

    if (!id) return;

    const movieToDelete = new Movie(id);
    const getData = await new Movie().get(['title', 'poster'], id);
    if (getData?.length) {
        const fs = require('fs');
        if (fs.existsSync(`./Image/${getData[0].title}/${getData[0].poster}`)) {
            fs.rmSync(`./Image/${getData[0].title}`, { recursive: true, force: true });
        }
    }

    return movieToDelete.remove();
}

module.exports = {
    getAll,
    create,
    update,
    remove
};