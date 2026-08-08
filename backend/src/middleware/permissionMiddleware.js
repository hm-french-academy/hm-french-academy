const { unauthorized, forbidden } = require('./responseHandler');

function requirePermission(allowedRoles = []) {
  return function (req, res, next) {
    const role = req.user && req.user.role;

    if (!req.user) {
      return unauthorized(res);
    }

    if (!allowedRoles.includes(role)) {
      return forbidden(res);
    }

    next();
  };
}

module.exports = { requirePermission };
