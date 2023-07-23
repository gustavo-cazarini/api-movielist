const { Movie } = require('../Class/Movie');

const getAll = async () => await new Movie().get();

module.exports = {
    getAll,
};