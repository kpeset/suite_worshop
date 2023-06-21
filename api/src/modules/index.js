const router = require("express").Router();
const usersRouter = require("./users");
const albumsRouter = require("./albums");
const tracksRouter = require("./tracks");

router.use("/users", usersRouter);
router.use("/albums", albumsRouter);
router.use("/tracks", tracksRouter);

module.exports = router;