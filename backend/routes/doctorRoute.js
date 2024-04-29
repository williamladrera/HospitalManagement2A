const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// GET all doctors
router.get("/", doctorController.doctors);

// GET a single doctor by ID
router.get("/:id", doctorController.doctor);

// Create a new doctor
router.post("/create", doctorController.createDoctor);

// Delete a doctor by ID
router.delete("/delete/:doctorID", doctorController.deleteDoctor);

// Update a doctor by ID
router.put("/update/:id", doctorController.updateDoctor);

module.exports = router;
