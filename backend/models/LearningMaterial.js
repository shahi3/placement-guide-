const mongoose = require('mongoose');

const LearningMaterialSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LearningMaterial', LearningMaterialSchema);
