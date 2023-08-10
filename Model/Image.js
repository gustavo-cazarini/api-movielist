const { Image } = require("../Class/Image");

const getAll = async () => await new Image().getImage();

module.exports = {
    getAll,
}