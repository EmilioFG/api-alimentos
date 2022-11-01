const BCRYPT = require('bcrypt');
const JWT = require('jwt-simple');

const CONFIG = require('../config');


const handleError = (res, message) => res.status(400).send({ message });

const bcryptPassword = async (password) => {
  const salt = await BCRYPT.genSalt(10);
  return await BCRYPT.hash(password, salt);
};

const verifyPassword = async (password, hashPassword) => {
  if (!BCRYPT.compareSync(password, hashPassword)) {
    return null;
  }
  return password;
};

const generateToken = (payload) => JWT.encode(payload, CONFIG.SECRET_SESSION);

const formatearFecha = (date) => (
  `${new Date(date).getFullYear()}-${new Date(date).getMonth()+1}-${new Date(date).getDate()}`
);


module.exports = {
  handleError,
  bcryptPassword,
  verifyPassword,
  generateToken,
  formatearFecha,
};
