const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/porcion.controllers');


router.get('/', getAll);


module.exports = router;
