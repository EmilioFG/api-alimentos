const { Router } = require('express');
const router = Router();

const { save, getByUsuario } = require('../controllers/ingesta.controllers');
const { verifyToken } = require('../middleware');


router.get('/', verifyToken, getByUsuario);
router.post('/', verifyToken, save);


module.exports = router;
