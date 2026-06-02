const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Token format should be: Bearer <token>
  const tokenParts = authHeader.split(' ');
  if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
    return res.status(401).json({ msg: 'Token formatting invalid, use Bearer <token>' });
  }

  try {
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET || 'supersecretlaunchpadtoken123');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
