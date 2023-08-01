const { Genre } = require('../Class/Genre');

const getAll = async () => await new Genre().get();

const create = async (data) => {
    const { title } = data.body;
    return await new Genre(false, title).post();
}

const update = async (data) => {
    const { id } = data.params;
    const { title } = data.body;

    if (!id && !title) {
        console.log(`Error: no id or title received during put request`);
        return false;
    }

    const genreToUpdate = new Genre(id, title);

    return await genreToUpdate.put();
}

module.exports = {
    getAll,
    create,
    update,
};