const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth-middleware');
const multer = require('multer');
const path = require('path');
const studentController = require('../controller/Student-controller');
// Resume upload config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resume/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
const upload = multer({ storage });

// Routes
router.get('/profile', auth, studentController.getStudentProfile);
router.post('/upload-resume', auth, upload.single('resume'), studentController.uploadResume);
router.get('/applied-companies', auth, studentController.getAppliedCompanies);
router.get('/upcoming-tests/:enrollmentNumber', auth,studentController.getStudentTests);
router.post('/apply/:companyId', auth, studentController.applyToCompany);
router.get('/result/:enrollmentNumber', auth, studentController.getStudentResult);
router.get('/upcoming-companies', auth, studentController.getUpcomingCompanies);
router.get('/view-alumni',auth, studentController.getAllAlumniStories);
router.get('/learningmaterial',auth, studentController.getLearningMaterial);

module.exports = router;
