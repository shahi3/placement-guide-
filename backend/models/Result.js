const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    result: { type: String, enum: ['pass', 'fail'], required: true },
    clearedRound: { type: String, required: true } // Field for cleared round
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
