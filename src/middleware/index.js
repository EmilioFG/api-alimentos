const JWT = require('jwt-simple');

const { handleError } = require('../utils');
const CONFIG = require('../config');


const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === 'null')  return handleError(res, "No tiene acceso a este recurso");

  const decode = JWT.decode(authorization, CONFIG.SECRET_SESSION);
  req.user = decode.id;
  next();
}


module.exports = {
  verifyToken,
}
