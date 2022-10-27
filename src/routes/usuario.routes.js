const { Router } = require('express');
const router = Router();

const { signIn } = require('../controllers/usuario.controllers');


router.post('/sign-in', signIn);


module.exports = router;
