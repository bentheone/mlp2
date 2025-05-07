const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (allowedRoles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Not authorized!' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) return res.status(401).json({ message: 'User not found' });

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = protect;
