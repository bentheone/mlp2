const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
  try {
      const token = req.cookies.token;

      if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
  } catch (err) {
    res.status(500).json({message: 'Internal server error'});
    console.error('Moddleware error!', err);
  }
};


const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You are not allowed' });
    }
    next();
  };
};

module.exports = { protect, authorize };
