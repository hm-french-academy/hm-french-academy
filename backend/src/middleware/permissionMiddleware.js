function requirePermission(allowedRoles = []) {
  return function (req, res, next) {
    const role = req.user && req.user.role;

    if (!role || !allowedRoles.includes(role)) {
      return res.statusCode = 403,
        res.end(JSON.stringify({
          success: false,
          message: 'Forbidden'
        }));
    }

    next();
  };
}

module.exports = { requirePermission };
