const { userService } = require('../../controllers/serviceRegistry');

function listUsersHandler(req, res) {
  return res.json(userService.getUsers());
}

function createUserHandler(req, res) {
  return res.json(userService.addUser(req.body));
}

module.exports = { listUsersHandler, createUserHandler };
