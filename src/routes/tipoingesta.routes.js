const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/tipoingesta.controllers');


router.get('/', getAll);


module.exports = router;
