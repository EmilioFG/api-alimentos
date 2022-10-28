const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/tipoingesta.controllers');
const { verifyToken } = require('../middleware');


router.get('/', verifyToken, getAll);


module.exports = router;
