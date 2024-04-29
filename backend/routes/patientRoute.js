// patientRoute.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');


// get all? 
router.get("/", patientController.patients);

// api/v1/patients/id
// api/v1/patients/662f1f501b276c3eaec9da04
router.get("/:id", patientController.patient);



module.exports = router;

//to GET on postman use: http://localhost:4000/api/v1/patients
//mongoDB password: testadmin