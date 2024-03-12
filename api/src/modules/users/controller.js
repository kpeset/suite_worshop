const { getAll, insertUser, getByEmail, addTrackToFav } = require("./model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const findAll = async (req, res, next) => {
  try {
    const users = await getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

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
    const { id, idTrack } = req.params;
    await addTrackToFav(id, idTrack);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const response = await getByEmail(req.body.email);
    if (response.length === 0) {
      res.status(400).send("Invalid email");
    } else {
      if (await argon.verify(response[0].password, req.body.password)) {
        const token = jwt.sign(
          {
            id: response[0].id,
            role: response[0].role,
          },
          process.env.JWT_AUTH_SECRET,
          { expiresIn: "1h" }
        );

        // Send jwt to client in cookie by following the steps below :

        // Add the credentials: trueoption to your cors middleware XXXXX
        // use res.cookie() method with the following parameters :
        //     first params should be a string identifier for retrieve your cookie later, you can define something like access_token|| token|| auth_token
        //     second parameters should be the data of the cookie insert the generated jwt here
        //     last params should be the options for generating the cookie, be sure to define the {httpOnly: true} option

        console.log(token);

        res
          .cookie("authCookie", token, { httpOnly: true })
          .json({
            id: response[0].id,
            email: response[0].email,
            role: response[0].role,
          });
      } else {
        console.info("Erreur de mot de passe");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, createUser, createFavTrack, login };
