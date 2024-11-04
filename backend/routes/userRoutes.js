const express = require('express');
const { register, login, logout, getalluser } = require('../controllers/userController');
const { userupload } = require('../middleware/Uploads');
const router = express.Router();


router.post('/register', userupload.single('image'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/get', getalluser);

module.exports = router;