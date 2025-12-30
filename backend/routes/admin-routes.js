const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth-middleware');
const multer = require('multer');
const path = require('path');
const {
  addCompany,
  uploadStory,
  addResult,
  getAllStories,
  getAllStudents,
  addStudentTest,
  getStudentsGroupedByDepartment,
  getCompaniesByDepartment,
  uploadLearningMaterial,
  getAllLearningMaterials,
  deleteLearningMaterial,
  getDashboardAnalytics,
  
} = require('../controller/Admin-controller');

// ✅ Multer Config for File Uploads (Images & PDFs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.startsWith('image') ? 'uploads/stories/' : 'uploads/pdfs/';
    cb(null, fileType);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Admin Routes
router.post('/add-company', authMiddleware, addCompany);
router.post('/add-test', authMiddleware, addStudentTest);
router.post('/add-result', authMiddleware, addResult);
router.post('/upload-story', authMiddleware, upload.single('image'), uploadStory);
router.get('/stories', authMiddleware, getAllStories);
router.get('/grouped-students', authMiddleware, getStudentsGroupedByDepartment);
router.get('/companies/:department', authMiddleware, getCompaniesByDepartment);
router.get('/dashboard-analytics', authMiddleware, getDashboardAnalytics);
router.get('/all-student', authMiddleware, getAllStudents); 



// ✅ Learning Material Routes
router.post('/upload-learning-material', authMiddleware, upload.single('pdf'), uploadLearningMaterial); // ✅ Admin can upload PDFs
router.get('/learning-materials', authMiddleware, getAllLearningMaterials); // ✅ Admin can view all materials
router.delete('/delete-learning-material/:id', authMiddleware, deleteLearningMaterial); // ✅ Admin can delete materials

module.exports = router;
