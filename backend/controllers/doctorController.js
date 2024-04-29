const Doctor = require('../models/doctorSchema');

module.exports.doctors = (req, res) => {
    // This method returns all active doctors
    Doctor.find({ active: true })
        .then((doctors) => res.send(doctors))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.doctor = (req, res) => {
    const doctorID = req.params.id;
    Doctor.findById(doctorID)
        .then((doctor) => {
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json(doctor);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.createDoctor = async (req, res) => {
    const { firstName, lastName, specialty, active } = req.body;

    const newDoctor = new Doctor({
        firstName,
        lastName,
        specialty,
        active
    });

    try {
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports.deleteDoctor = (req, res) => {
    const doctorID = req.params.doctorID;

    Doctor.findByIdAndUpdate(doctorID, { active: false }, { new: true })
        .then((doctor) => {
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json(doctor);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.updateDoctor = (req, res) => {
    const { firstName, lastName, specialty, active } = req.body;
    const doctorID = req.params.id;
    const updatedFields = { firstName, lastName, specialty, active };

    Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
        .then((updatedDoctor) => {
            if (!updatedDoctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json(updatedDoctor);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};
