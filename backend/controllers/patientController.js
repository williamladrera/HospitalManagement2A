const Patient = require('../models/patientSchema')

const mongoose = require("mongoose");

module.exports.patients = (req, res) =>{
    //this method returns all confined patinets/active
    Patient.find({})
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