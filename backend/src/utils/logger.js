function logInfo(message, data = {}) {
  console.log(JSON.stringify({ level: 'info', message, data }));
}

function logError(message, error = {}) {
  console.error(JSON.stringify({ level: 'error', message, error }));
}

module.exports = { logInfo, logError };
