function unauthorized(res, message = 'Unauthorized') {
  res.statusCode = 401;
  return res.end(JSON.stringify({
    success: false,
    message
  }));
}

function forbidden(res, message = 'Forbidden') {
  res.statusCode = 403;
  return res.end(JSON.stringify({
    success: false,
    message
  }));
}

module.exports = { unauthorized, forbidden };
