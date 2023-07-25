const { Movie } = require('../Class/Movie');

const getAll = async () => await new Movie().get();

const create = async (data, file) => {
    const { title, plot, year, runtime, imdbRating } = data.body;
    const poster = file.filename;
    return await new Movie(null, title, plot, year, runtime, imdbRating, poster).post();
}

module.exports = {
    getAll,
    create,
};