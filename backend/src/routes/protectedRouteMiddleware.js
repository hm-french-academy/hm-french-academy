const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

module.exports = {
  authMiddleware,
  requireRole
};
