function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    req.user = null;
    return next();
  }

  req.user = {
    token,
    role: 'student'
  };

  next();
}

module.exports = authMiddleware;
