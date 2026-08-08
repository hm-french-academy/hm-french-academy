function validateRequiredFields(data, fields = []) {
  const missing = fields.filter(field => data[field] === undefined || data[field] === null);

  return {
    valid: missing.length === 0,
    missing
  };
}

module.exports = { validateRequiredFields };
