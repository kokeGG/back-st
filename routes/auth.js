const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require('../middleware/auth');

router.post('/', 
    [
        check('username', 'Nombre de usuario no puede ir vacío').not().isEmpty(),
        check('password', 'El password no puede ir vacío').not().isEmpty()
    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;