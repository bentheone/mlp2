const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d' });
};

// @desc Register new User
exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message: 'User exists!'});

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({message: {id: user._id, name, email}});
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user || !(await user.matchPassword(password))) {
        return res.status(401).json({message: 'Invalid credentials!'});
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({user: {id: user._id, name: user.name, email: user.email}});
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logged out successfully!'});
}