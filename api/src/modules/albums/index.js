const router = require('express').Router();
const albums = require('./controller');
const albumSchema = require("./validator");

const validate = require("../../middlewares/validator");

router.get('/', albums.getAll);
router.get('/:id', albums.getOne);
router.get('/:id/tracks', albums.getTracksByAlbumId);
router.post('/', validate(albumSchema), albums.postAlbums);
router.put('/:id', albums.updateAlbums);
router.delete('/:id', albums.deleteAlbums);

module.exports = router;