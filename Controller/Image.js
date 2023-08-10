const { Image } = require('../Class/Image');
const Model = require('../Model/Image');

const getAll = async (req, res) => {
    try {
        const ret = await Model.getAll();
        return (ret?.length) ?
            res.status(200).json(ret) :
            res.status(200).json({ error: 'No data found...' });
    } catch (err) {
        console.log(`An error occurred while getting the data:\n${err}`);
    }
};

module.exports = {
    getAll,
}