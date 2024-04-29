const Patient = require('../models/patientSchema')

const mongoose = require("mongoose");

module.exports.patients = (req, res) =>{
    //this method returns all confined patinets/active
    Patient.find({active: true})
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));

};


module.exports.patient = (req, res) =>{

    const patientID = req.params.id;
    //must be matched with route
    Patient.findById(patientID)
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));

};

module.exports.createPatient = (req, res) => {

    const { firstName, lastName, age, active, confined } = req.body;

    const newPatient = new Patient({
        firstName,
        lastName,
        age,
        active,
        confined
    });
    try { 
        const savedPatient = newPatient.save();
        res.status(201).json({"new patient": newPatient});//successfully created
     } catch (error) {
        res.status(500).json({error: error.message || "Internal Server Error" });
    }
};

module.exports.deletePatient = (req, res) =>{
    const patientID = req.params.patientID;
    console.log(patientID);

    const update = {active: false, confined: false};

    Patient.findByIdAndUpdate(patientID, update, {new: true})
    .then((patient) => res.send(patient))
    .catch((error) => res.send(error));

};
module.exports.updatePatient = (req, res) =>{
    const { firstName, lastName, age, active, confined } = req.body;

    console.log(req.body); //what we supply on POSTMAN

    const patientID = req.params.id;
    const updatedFields = { firstName, lastName, age, active, confined };

    console.log(updatedFields); //changes

    Patient.findByIdAndUpdate(patientID, updatedFields, {new: true})
    .then((updatedPatient) => {
        if (!updatedPatient){
            return res.status(404).json({error: 'Patient not found'});
        }
        res.status(200).json(updatedPatient);
    })
    .catch((error) => {
        res.status(500).json({error: error.message || "Internal server error"});
    });
};
