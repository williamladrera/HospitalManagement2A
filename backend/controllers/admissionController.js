const Admission = require('../models/admissionSchema');

module.exports.admissions = (req, res) => {
    // This method returns all admissions
    Admission.find()
        .then((admissions) => res.send(admissions))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.admission = (req, res) => {
    const admissionID = req.params.id;
    Admission.findById(admissionID)
        .then((admission) => {
            if (!admission) {
                return res.status(404).json({ error: 'Admission not found' });
            }
            res.status(200).json(admission);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.createAdmission = async (req, res) => {
    const { patient, admissionDate, dischargeDate, diagnosis } = req.body;

    const newAdmission = new Admission({
        patient,
        admissionDate,
        dischargeDate,
        diagnosis
    });

    try {
        const savedAdmission = await newAdmission.save();
        res.status(201).json(savedAdmission);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports.deleteAdmission = (req, res) => {
    const admissionID = req.params.admissionID;

    Admission.findByIdAndDelete(admissionID)
        .then((admission) => {
            if (!admission) {
                return res.status(404).json({ error: 'Admission not found' });
            }
            res.status(200).json(admission);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.updateAdmission = (req, res) => {
    const { admissionDate, dischargeDate, diagnosis } = req.body;
    const admissionID = req.params.id;
    const updatedFields = { admissionDate, dischargeDate, diagnosis };

    Admission.findByIdAndUpdate(admissionID, updatedFields, { new: true })
        .then((updatedAdmission) => {
            if (!updatedAdmission) {
                return res.status(404).json({ error: 'Admission not found' });
            }
            res.status(200).json(updatedAdmission);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};
