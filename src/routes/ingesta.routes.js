const { Router } = require('express');
const router = Router();

const { save } = require('../controllers/ingesta.controllers');


router.post('/', save);


module.exports = router;
