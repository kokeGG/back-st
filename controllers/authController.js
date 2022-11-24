const User = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./variables.env" });
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res, next) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Buscar el usuario para ver si esta registrado
  const { username, password } = req.body;
  const usuario = await User.findOne({ where: { username: username } });

  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    return next();
  }

  if (bcrypt.compareSync(password, usuario.password)) {
    const token = jwt.sign(
      {
        id: usuario.idUser,
        username: usuario.username,
        rol: usuario.rol,
        pass: usuario.password
      },
      process.env.DATABASE_PASSWORD,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Password incorrecto" });
    return next();
  }
};

exports.usuarioAutenticado = (req, res, next) => {
  res.json({ usuario: req.usuario });
};
