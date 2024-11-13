const { postcreate, postget, postuserget, postlike } = require('../controllers/postController');
const { blogupload } = require('../middleware/Uploads');
const { isUser } = require('../middleware/VerifyToken');

const router = require('express').Router();



router.post('/create',blogupload.single('image'), postcreate);
router.post('/like', postlike);
router.get('/get', postget);
router.get('/get/:username', postuserget);


module.exports = router;