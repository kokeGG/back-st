const Assignment = require("../models/Assignment");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../config/db");
const { QueryTypes } = require("sequelize");

exports.createAssignment = async (req, res) => {
  const{
    idUser,
    idDevice,
    manager,
  } = req.body;

  try {
    await db.query("call addAssignment(?, ?, ?)", {
      replacements: [idUser, idDevice, manager],
      type: QueryTypes.INSERT,
    });
    res.json({ msg: "Assignment created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT Assignments.idAssignment, Users.first_name, Users.paternal_surname, Users.maternal_surname, Users.idUser, Devices.trademark, Assignments.manager, Devices.serie_number, Devices.idDevice, Devices.model 
      FROM (Assignments 
        LEFT JOIN Users ON Assignments.idUser = Users.idUser) 
        LEFT JOIN Devices ON Assignments.idDevice = Devices.idDevice;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentsWithoutDevice = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT * FROM Devices WHERE assignment = false`
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Assignments WHERE idAssignment = ?",
      {
        replacements: [req.params.id],
        type: QueryTypes.SELECT,
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
    try {
        await Assignment.update(req.body, {
            where: { idAssignment: req.params.id }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.deleteAssignment = async (req, res) => {
  try {
    await db.query("call deleteAssignment(?)", {
      replacements: [req.params.id],
      type: QueryTypes.DELETE,
    });
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
