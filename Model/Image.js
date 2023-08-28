const { Image } = require("../Class/Image");
const { Movie } = require("../Class/Movie");

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

const remove = async (data) => {
    const { id } = data.params;
    if (!id) {
        console.log("Error (Image): no id received during del request");
        return false;
    }

    const imageToRemove = new Image(id);
    const imageData = await imageToRemove.getImage(['url', 'fk_movie_id']);
    const movieData = await new Movie(imageData[0].fk_movie_id).get(['title'], imageData[0].fk_movie_id);

    if (!movieData) return false;

    const fs = require('fs');
    if (fs.existsSync(`./Image/${movieData[0].title}/${imageData[0].url}`)) {
        fs.unlinkSync(`./Image/${movieData[0].title}/${imageData[0].url}`);
    }
    return imageToRemove.deleteImage();
}

module.exports = {
    getAll,
    create,
    remove,
}