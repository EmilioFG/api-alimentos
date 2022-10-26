const { Router } = require('express');
const router = Router();

const { save, getByUsuario } = require('../controllers/ingesta.controllers');


router.get('/', getByUsuario);
router.post('/', save);


module.exports = router;
