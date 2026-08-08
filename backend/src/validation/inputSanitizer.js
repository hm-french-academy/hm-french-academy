function sanitizeInput(data = {}) {
  const clean = {};

  Object.keys(data).forEach((key) => {
    clean[key] = typeof data[key] === 'string'
      ? data[key].trim()
      : data[key];
  });

  return clean;
}

module.exports = { sanitizeInput };
