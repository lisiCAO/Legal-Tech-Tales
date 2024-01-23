const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  if (!req.cookies) return res.sendStatus(401);
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json('Invalid token');
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

