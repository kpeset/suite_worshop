const router = require("express").Router();
const userSchema = require("./validator");
const validator = require("../../middlewares/validator");
const { findAll, createUser, createFavTrack } = require("./controller");

router.get("/", findAll);
router.post('/', validator(userSchema), createUser);
router.post('/:id/track/:idTrack', createFavTrack);

module.exports = router;