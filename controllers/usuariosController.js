const User = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../config/db");
const { QueryTypes } = require("sequelize");

exports.nuevoUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { username, password } = req.body;

  let usuario = await User.findOne({ where: { username: username } });

  if (usuario) {
    return res.status(400).json({ msg: "El usuario ya está registrado" });
  }

  usuario = await new User(req.body);

  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  try {
    await usuario.save();
    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT Users.idUser, Users.first_name, Users.paternal_surname, Users.maternal_surname, Users.username, Roles.role_name, Users.location, Users.phoneNumber, Users.email, Users.gender FROM Users LEFT JOIN Roles ON Users.rol = Roles.idRole;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Users WHERE idUser = ?", {
      replacements: [req.params.id],
      type: QueryTypes.SELECT,
    });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const result = await User.update(req.body, {
      where: { idUser: req.params.id },
    });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query("call deleteUser(?)", {
      replacements: [req.params.id],
      type: QueryTypes.DELETE,
    });

    return res.status(204).json({ msg: "Deleted User" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
