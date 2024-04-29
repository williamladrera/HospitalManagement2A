const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const admissionSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, "Patient reference is needed"]
    },
    admissionDate: {
        type: Date,
        default: Date.now,
        required: [true, "Admission date is needed"]
    },
    dischargeDate: {
        type: Date,
        required: [true, "Discharge date is needed"]
    },
    diagnosis: {
        type: String,
        required: [true, "Diagnosis is needed"]
    }
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
