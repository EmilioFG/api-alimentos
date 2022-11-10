const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/reporte.controllers');
const { verifyToken } = require('../middleware');


router.get('/', verifyToken, getAll);


module.exports = router;
