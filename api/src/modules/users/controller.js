const { getAll, insertUser, getByEmail, addTrackToFav } = require("./model");
const argon = require("argon2");

const findAll = async (req, res, next) => {
    try {
        const users = await getAll();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username, email, role } = req.body;

        const [user] = await getByEmail(req.body.email);
        if (user) return res.status(400).json("email already exists");

        req.body.password = await argon.hash(req.body.password);
        const result = await insertUser(req.body);
        res.status(201).json({ id: result.insertId, username, email, role });
    } catch (err) {
        next(err);
    }
};

const createFavTrack = async (req, res, next) => {
    try {
        const {id, idTrack} = req.params;
        await addTrackToFav(id, idTrack);
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

module.exports = { findAll, createUser, createFavTrack };