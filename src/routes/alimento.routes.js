const { Router } = require('express');
const router = Router();

const { getAll, getById, getByName } = require('../controllers/alimento.controllers');
const { verifyToken } = require('../middleware');


router.get('/', verifyToken, getAll);
router.get('/nombre', verifyToken, getByName);
router.get('/:id', verifyToken, getById);


module.exports = router;
