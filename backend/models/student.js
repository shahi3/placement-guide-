// models/User.js (or student.js if you want separate models for admin and student)
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    courseYear: Number,
    marks10: Number,
    marks12: Number,
    enrollmentNumber: String,
    mobileNumber: String,
    department: String,
    dateOfBirth: Date
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
