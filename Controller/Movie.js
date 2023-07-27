const Model = require('../Model/Movie');

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
    let poster = req?.file;
    try {
        const insert = await Model.create(req, poster);
        return res.status(201).json(insert);
    } catch (err) {
        console.log(`An error occurred while posting the data:\n${err}`);
    }

}

const update = async (req, res) => {
    let poster = req?.file;
    const att = await Model.update(req, poster);
    return res.status(200).json(att);
}

module.exports = { getAll, create, update, };