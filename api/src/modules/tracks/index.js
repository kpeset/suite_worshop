const router = require('express').Router();
const tracks = require('./controller');
const trackSchema = require("./validator");

const validate = require("../../middlewares/validator");

router.get('/', tracks.getAll);
router.get('/:id', tracks.getOne);
router.post('/', validate(trackSchema), tracks.postTracks);
router.put('/:id', tracks.updateTracks);
router.delete('/:id', tracks.deleteTracks);

module.exports = router;