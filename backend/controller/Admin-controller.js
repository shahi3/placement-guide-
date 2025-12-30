const Company = require('../models/Company');
const Test = require('../models/Test');
const Result = require('../models/Result');
const AlumniStory = require('../models/AlumniStory');
const Student = require('../models/student');
const Admin = require('../models/admin');
const path = require('path');
const LearningMaterial = require('../models/LearningMaterial');

// Get all learning materials
const getAllLearningMaterials = async (req, res) => {
    try {
        const materials = await LearningMaterial.find().sort({ uploadedAt: -1 });
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        console.error("Error fetching learning materials:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Upload new learning material
const uploadLearningMaterial = async (req, res) => {
    try {
        const { subject } = req.body;
        const pdfUrl = req.file ? `/uploads/pdfs/${req.file.filename}` : null;

        if (!subject || !pdfUrl) {
            return res.status(400).json({ success: false, message: "Subject and PDF are required." });
        }

        const newMaterial = new LearningMaterial({ subject, pdfUrl });
        await newMaterial.save();

        res.status(201).json({ success: true, message: "Learning material uploaded successfully!", data: newMaterial });
    } catch (error) {
        console.error("Error uploading learning material:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Delete a learning material
const deleteLearningMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await LearningMaterial.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Learning material deleted successfully!" });
    } catch (error) {
        console.error("Error deleting learning material:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Add result
const addResult = async (req, res) => {
  try {
    const { enrollmentNumber, companyName, result, clearedRound } = req.body;

    if (!enrollmentNumber || !companyName || !result || !clearedRound) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const student = await Student.findOne({ enrollmentNumber });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const newResult = new Result({
      studentId: student._id,
      companyId: company._id,
      result,
      clearedRound,
    });

    await newResult.save();
    res.status(201).json({ success: true, message: 'Result added successfully', result: newResult });
  } catch (error) {
    console.error('Error adding result:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add a new company
const addCompany = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);

    const { name, eligibility, description, department, applicationDeadline, googleFormLink } = req.body; // Include new fields
    const adminId = req.user.userid;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const newCompany = new Company({
      name,
      eligibility,
      description,
      department,
      applicationDeadline, // New field
      googleFormLink, // New field
      createdBy: adminId,
    });

    await newCompany.save();
    console.log('New company saved:', newCompany);

    res.status(201).json({ success: true, message: 'Company added successfully', company: newCompany });
  } catch (error) {
    console.error('Error in addCompany:', error);
    res.status(500).json({ success: false, message: 'Failed to add company' });
  }
};
// ✅ Upload Alumni Story
const uploadStory = async (req, res) => {
    try {
        const { name, story, year } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate required fields
        if (!name || !story || !year) {
            return res.status(400).json({ success: false, message: 'Name, story, and year are required' });
        }

        const newStory = new AlumniStory({ name, story, year, image });
        await newStory.save();

        res.status(201).json({ success: true, message: 'Story uploaded successfully', data: newStory });
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).json({ success: false, message: 'Story upload failed' });
    }
};

// ✅ Get All Alumni Stories
const getAllStories = async (req, res) => {
    try {
        const stories = await AlumniStory.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: stories });
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch stories' });
    }
};

// Get companies by department
const getCompaniesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const companies = await Company.find({ department }).select('name eligibility description applicationDeadline googleFormLink'); // Include new fields
    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch companies' });
  }
};

// Get students grouped by department
const getStudentsGroupedByDepartment = async (req, res) => {
  try {
    const grouped = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          students: { $push: '$$ROOT' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({ success: true, data: grouped });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch grouped students' });
  }
};
// ✅ Admin adds a test for a student using enrollment number
const addStudentTest = async (req, res) => {
  try {
      const { enrollmentNumber, companyName, date, description, testLink, location } = req.body;

      // Verify the requesting user is an admin
      const adminId = req.user.userid;
      const admin = await Admin.findById(adminId);
      if (!admin) {
          return res.status(403).json({ success: false, message: 'Unauthorized access' });
      }

      // Validate required fields
      if (!enrollmentNumber || !companyName || !date || !testLink || !location) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      // Find the student by enrollment number
      const student = await Student.findOne({ enrollmentNumber });
      if (!student) {
          return res.status(404).json({ success: false, message: 'Student not found' });
      }

      // Find the company by name
      const company = await Company.findOne({ name: companyName });
      if (!company) {
          return res.status(404).json({ success: false, message: 'Company not found' });
      }

      // ✅ Directly assign the test to the student
      const newTest = new Test({
          studentId: student._id,
          enrollmentNumber,
          companyId: company._id,
          companyName,
          date,
          description,
          testLink,
          location
      });

      await newTest.save();
      res.status(201).json({ success: true, message: 'Test assigned successfully', data: newTest });
  } catch (error) {
      console.error('Error assigning test:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
const getDashboardAnalytics = async (req, res) => {
  try {
      // Fetch counts for students, companies, results, and tests
      const studentCount = await Student.countDocuments();
      const companyCount = await Company.countDocuments();
      const resultCount = await Result.countDocuments();
      const testCount = await Test.countDocuments();

      // Respond with the counts
      res.status(200).json({
          success: true,
          data: {
              students: studentCount,
              companies: companyCount,
              results: resultCount,
              tests: testCount
          }
      });
  } catch (error) {
      console.error("Error fetching analytics data:", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const { department } = req.query;

    // Base filter
    const filter = { role: 'student' };

    // Add department filter if provided
    if (department) {
      filter.department = department;
    }

    const students = await Student.find(filter).select('-password'); // hide password

    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  addCompany,
  addStudentTest,
  getAllStudents,
  uploadStory,
  getAllStories,
  addResult,
  getCompaniesByDepartment,
  getStudentsGroupedByDepartment,
  uploadLearningMaterial,
  getAllLearningMaterials,
  deleteLearningMaterial,
  getDashboardAnalytics,
};
