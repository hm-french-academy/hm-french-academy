const store = require('../storage/dataStore');
const User = require('../models/User');

function addUser(data) {
  const user = new User(data);
  store.users.push(user);
  return user;
}

function getUsers() {
  return store.users;
}

module.exports = { addUser, getUsers };
