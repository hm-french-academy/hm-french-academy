const User = require('../models/User');

const users = [];

function createUser(data) {
  const user = new User(data);
  users.push(user);
  return user;
}

function listUsers() {
  return users;
}

module.exports = { createUser, listUsers };
