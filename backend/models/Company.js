const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    eligibility: { type: String, required: true },
    description: { type: String },
    department: { type: String, required: true }, // Department the company is for
    applicationDeadline: { type: Date, required: true }, // Application deadline for the company
    googleFormLink: { type: String, required: true }, // Link to the application Google Form
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' } // Admin who added the company
});

module.exports = mongoose.model('Company', CompanySchema);
