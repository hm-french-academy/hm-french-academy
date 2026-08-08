// HM Academy authentication service foundation

function createSession(user) {
  return {
    userId: user.id,
    role: user.role,
    createdAt: new Date().toISOString()
  };
}

function verifyCredentials(email, password) {
  return { email, authenticated: false, message: 'Connect production identity provider' };
}

module.exports = { createSession, verifyCredentials };
