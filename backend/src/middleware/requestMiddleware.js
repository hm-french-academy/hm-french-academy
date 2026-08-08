function requestMiddleware(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}

module.exports = requestMiddleware;
