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

const create = async (req, res) => {
    if (!req && !req.files) return false;
    try {
        const insert = await Model.create(req, req.files);
        return res.status(201).json(insert);
    } catch (err) {
        console.log(`An error occurred while posting the data:\n${err}`);
        return false;
    }
}

module.exports = {
    getAll,
    create,
}