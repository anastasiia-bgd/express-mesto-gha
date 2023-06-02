const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('You need to log in');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'cat');
  } catch (err) {
    return next(new Unauthorized('You need to log in'));
  }

  req.user = payload;
  return next();
};
