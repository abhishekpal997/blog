const multer = require('multer');
const path = require('path');

// Configure storage for user uploads
const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/user");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const blogStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/blog");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});



// Initialize multer with user storage
const userupload = multer({ storage: userStorage });

const blogupload = multer({ storage: blogStorage });

module.exports = { userupload, blogupload };
