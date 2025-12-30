const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Link to student
    enrollmentNumber: { type: String, required: true }, // Directly store enrollment number for easy lookup
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Link to company
    companyName: { type: String, required: true }, // Store company name for quick access
    date: { type: Date, required: true }, // Date of the test
    description: { type: String }, // Test details
    testLink: { type: String, required: true }, // Link to the test
    location: { type: String, required: true } // Test location (online or venue)
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
