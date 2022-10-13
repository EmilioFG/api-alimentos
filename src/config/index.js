require('dotenv').config();

exports.DB_HOST = process.env.DB_HOST || '';
exports.DB_USER = process.env.DB_USER || '';
exports.DB_DATABASE = process.env.DB_DATABASE || '';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
