const { Router } = require('express');
const router = Router();

const { getAll, getById, getByName } = require('../controllers/alimento.controllers');


router.get('/', getAll);
router.get('/nombre', getByName);
router.get('/:id', getById);


module.exports = router;