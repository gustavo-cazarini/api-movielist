const { Genre } = require('../Class/Genre');

const getAll = async () => await new Genre().get();

const create = async (data) => {
    const { title } = data.body;
    return await new Genre(false, title).post();
}

module.exports = {
    getAll,
    create,
};