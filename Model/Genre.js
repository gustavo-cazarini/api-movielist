const { Genre } = require('../Class/Genre');

const getAll = async () => await new Genre().get();

module.exports = {
    getAll,
};