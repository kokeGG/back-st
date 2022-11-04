const express = require('express');
const router = express.Router();
const deviceController = require("../controllers/devicesControllers")
const { check } = require("express-validator")

router.post("/", deviceController.createDevice);

router.get("/", deviceController.getAllDevices);

router.get("/:id", deviceController.getDevice);

router.put("/:id", deviceController.updateDevice);

router.delete("/:id", deviceController.deleteDevice);


module.exports = router;