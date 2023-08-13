const { Image } = require("../Class/Image");

const getAll = async () => await new Image().getImage();

const create = async (data, file) => {
    const { movieId } = data.body;
    if (!file?.length && !movieId) return false;
    let filenames = [];
    file.forEach((item) => {
        filenames.push(item.filename);
    });
    return await new Image(false, filenames, movieId).postImage();
}

module.exports = {
    getAll,
    create,
}