const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    lastName: {
        type: String,
        required: [true, "Last name is needed"]
    },
    firstName: {
        type: String,
        required: [true, "First name is needed"]
    },
    specialty: {
        type: String,
        required: [true, "Specialty is needed"]
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
