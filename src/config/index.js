require('dotenv').config();

exports.DB_HOST = process.env.DB_HOST || '';
exports.DB_USER = process.env.DB_USER || '';
exports.DB_DATABASE = process.env.DB_DATABASE || '';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_PORT = process.env.DB_PORT || 5432
exports.PORT = process.env.PORT || 1337;
exports.NODE_ENVIROMENT = process.env.NODE_ENVIROMENT || 'development';
