const Model = require('../Model/Genre');

const getAll = async (req, res) => {
    try {
        const ret = await Model.getAll();
        return (ret?.length) ?
            res.status(200).json(ret) :
            res.status(200).json({ error: 'No data found on genre table' });
    } catch (err) {
        console.log(`An error occurred while getting the data:\n${err}`);
        return false;
    }
}

const create = async (req, res) => {
    try {
        const insert = await Model.create(req);
        return res.status(201).json(insert);
    } catch (err) {
        console.log(`An error occurred while posting the data:\n${err}`);
        return false;
    }
}

const update = async (req, res) => {
    try {
        const update = await Model.update(req);
        if (!update) {
            console.log(`Error: genre update failure`);
            return false;
        }
        return res.status(200).json(update);
    } catch (err) {
        console.log(`An error occurred while putting the data:\n${err}`);
        return false;
    }
}

const remove = async (req, res) => {
    try {
        const remove = await Model.remove(req);
        if (!remove) {
            console.log(`Error: genre del failure`);
            return false;
        }
        return res.status(200).json(remove);
    } catch (err) {
        console.log(`An error occurred while removing the data:\n${err}`);
        return false;
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}