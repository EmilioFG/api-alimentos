const { Router } = require('express');
const router = Router();

const { signIn, logIn } = require('../controllers/usuario.controllers');


router.post('/signin', signIn);
router.post('/login', logIn);


module.exports = router;
