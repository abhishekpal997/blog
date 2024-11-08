const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = async (req, res, next) => {
    try {
        const token = res.cookies.token;
        if (!token) {
            res.status(400).json({ msg: 'No token Provided' })
        }

        const decode = await jwt.verify(token, procee.env.JWT_TOKEN);
        const user = await UserModel.findById(decode.id);

        if (user.role !== 'admin') {
            res.status(400).json({ msg: 'User is not an admin' })
        };
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json({ error, msg: 'No token Provided' })
    }
}


const isUser = async (req, res, next) => {
    try {
        const token = res.cookies.token;
        if (!token) {
            res.status(400).json({ msg: 'No token Provided' })
        }

        const decode = await jwt.verify(token, process.env.JWT_TOKEN);
        const user = await UserModel.findById(decode.id);

        if (!user) {
            res.status(400).json({ msg: 'User is not an admin' })
        };
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json({ error, msg: 'No token Provided' })
    }
}

module.exports = { isAdmin, isUser }