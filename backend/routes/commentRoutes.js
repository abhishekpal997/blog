const { commentpost } = require('../controllers/commentController');

const router = require('express').Router();


router.post('/create', commentpost);

module.exports = router;