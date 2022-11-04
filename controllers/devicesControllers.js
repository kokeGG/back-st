const Device = require("../models/Device");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../config/db");
const { QueryTypes } = require("sequelize");

exports.createDevice = async (req, res) => {
    device = await new Device(req.body);

    try {
        await device.save();
        res.json({msg: "Device created"});
    } catch (error) {
        console.log(error);
    }
}

exports.getAllDevices = async (req, res) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM Devices"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getDevice = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM Devices WHERE idDevice = ?", {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        if (!result) {
            return res.status(404).json({ message: "Device not found" })
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateDevice = async (req, res) => {
    try {
        await Device.update(req.body, {
            where: { idDevice: req.params.id }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteDevice = async (req, res) => {
    try {
        await db.query("call deleteDevice(?)", {
            replacements: [req.params.id],
            type: QueryTypes.DELETE
        });
        return res.status(204);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}