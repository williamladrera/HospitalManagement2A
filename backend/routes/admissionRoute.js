const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');

// GET all admissions
router.get("/", admissionController.admissions);

// GET a single admission by ID
router.get("/:id", admissionController.admission);

// Create a new admission
router.post("/create", admissionController.createAdmission);

// Delete an admission by ID
router.delete("/delete/:admissionID", admissionController.deleteAdmission);

// Update an admission by ID
router.put("/update/:id", admissionController.updateAdmission);

module.exports = router;
