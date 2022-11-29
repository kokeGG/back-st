const express = require('express');
const router = express.Router();
const assignmentController = require("../controllers/assignmentsController")
const { check } = require("express-validator")

router.post("/api/assignments", assignmentController.createAssignment);

router.get("/api/assignments", assignmentController.getAllAssignments);

router.get("/api/assignments/:id", assignmentController.getAssignment);

router.get("/api/assignments-no-devices", assignmentController.getAssignmentsWithoutDevice);

router.get("/api/assignmentsUser/:id", assignmentController.getAssignmentsUser);

router.put("/api/assignments/:id", assignmentController.updateAssignment);

router.delete("/api/assignments/:id", assignmentController.deleteAssignment);


module.exports = router;