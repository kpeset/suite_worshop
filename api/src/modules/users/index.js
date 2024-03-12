const router = require("express").Router();
const userSchema = require("./validator");
const validator = require("../../middlewares/validator");
const { findAll, createUser, createFavTrack, login } = require("./controller");

router.get("/", findAll);
router.post("/", validator(userSchema), createUser);
router.post("/:id/track/:idTrack", createFavTrack);

router.post("/login", login);

module.exports = router;
