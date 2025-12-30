const mongoose = require('mongoose');

const alumniStorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    story: { type: String, required: true },
    year: { type: String, required: true },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AlumniStory', alumniStorySchema);
