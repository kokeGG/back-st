const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuariosController")
const { check } = require("express-validator")

router.post("/", 
    [
        check("username", "El username es obligatorio").not().isEmpty()
    ],
    usuarioController.nuevoUsuario
);

router.get("/", usuarioController.getAllUsers);

router.get("/:id", usuarioController.getUser);

router.put("/:id", 
    [
        check("username",  "El username es obligatorio").not().isEmpty()
    ],
    usuarioController.updateUser
);

router.delete("/:id", usuarioController.deleteUser);


module.exports = router;