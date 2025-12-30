const User = require('../models/student');
const Company = require('../models/Company');
const Resume = require('../models/Resume');
const Test = require('../models/Test');
const Result = require('../models/Result');
const AlumniStory = require('../models/AlumniStory');
const LearningMaterial=require('../models/LearningMaterial')

// ✅ Get student profile
const getStudentProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.userid) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const student = await User.findById(req.user.userid).select('-password');
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, data: student });
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Upload resume
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const existingResume = await Resume.findOne({ studentId: req.user.userid });
        if (existingResume) {
            return res.status(409).json({ success: false, message: 'Resume already uploaded' });
        }

        const resume = new Resume({
            studentId: req.user.userid,
            filePath: req.file.path,
        });

        await resume.save();
        res.status(201).json({ success: true, message: 'Resume uploaded successfully', data: resume });
    } catch (err) {
        console.error('Resume upload error:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Get applied companies
const getAppliedCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ appliedStudents: req.user.userid });
        if (!companies.length) {
            return res.status(404).json({ success: false, message: 'No companies found' });
        }

        res.status(200).json({ success: true, data: companies });
    } catch (err) {
        console.error('Error fetching applied companies:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Apply to company
const applyToCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ success: false, message: 'Invalid company ID' });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        if (company.appliedStudents.includes(req.user.userid)) {
            return res.status(409).json({ success: false, message: 'Already applied to this company' });
        }

        company.appliedStudents.push(req.user.userid);
        await company.save();

        res.status(200).json({ success: true, message: 'Application successful' });
    } catch (err) {
        console.error('Error applying to company:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const getStudentTests = async (req, res) => {
    try {
        const { enrollmentNumber } = req.params;

        // Validate that enrollmentNumber is provided
        if (!enrollmentNumber) {
            return res.status(400).json({ success: false, message: 'Enrollment number is required' });
        }

        // Find the student using enrollmentNumber
        const student = await User.findOne({ enrollmentNumber });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Fetch tests for the found student
        const tests = await Test.find({ enrollmentNumber });
        if (!tests.length) {
            return res.status(404).json({ success: false, message: 'No tests found for this student' });
        }

        // Format the response data
        const formattedTests = tests.map(test => ({
            companyName: test.companyName, // Directly fetched from the Test schema
            testDate: test.date,          // Scheduled date of the test
            description: test.description, // Test details
            testLink: test.testLink,      // Link to access the test
            location: test.location,      // Test location, e.g., "Online"
            status: test.status || 'Pending', // Test status: Passed, Failed, or Pending
        }));

        // Respond with the formatted tests
        res.status(200).json({ success: true, data: formattedTests });
    } catch (error) {
        console.error('Error fetching student tests:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Get upcoming companies
const getUpcomingCompanies = async (req, res) => {
    try {
        const student = await User.findById(req.user.userid).select('department');
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const upcomingCompanies = await Company.find({
            department: student.department,
            applicationDeadline: { $gte: new Date() },
        }).select('name eligibility description applicationDeadline googleFormLink');

        if (!upcomingCompanies.length) {
            return res.status(404).json({ success: false, message: 'No upcoming companies found for your department.' });
        }

        res.status(200).json({ success: true, companies: upcomingCompanies });
    } catch (error) {
        console.error('Error fetching upcoming companies:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Get student results
const getStudentResult = async (req, res) => {
    try {
        const { enrollmentNumber } = req.params;

        if (!enrollmentNumber) {
            return res.status(400).json({ success: false, message: 'Enrollment number is required' });
        }

        const student = await User.findOne({ enrollmentNumber });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const results = await Result.find({ studentId: student._id }).populate('companyId', 'name');
        if (!results.length) {
            return res.status(404).json({ success: false, message: 'No results found for this student' });
        }

        const formattedResults = results.map(result => ({
            companyName: result.companyId.name,
            result: result.result,
            clearedRound: result.clearedRound,
        }));

        res.status(200).json({ success: true, data: formattedResults });
    } catch (error) {
        console.error('Error fetching student result:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Get all alumni stories
const getAllAlumniStories = async (req, res) => {
    try {
        const stories = await AlumniStory.find().sort({ createdAt: -1 });

        if (!stories.length) {
            return res.status(404).json({ success: false, message: 'No alumni stories found.' });
        }

        res.status(200).json({ success: true, data: stories });
    } catch (error) {
        console.error('Error fetching alumni stories:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};const getLearningMaterial = async (req, res) => {
    try {
        // Fetch all learning materials, sorted by upload date (newest first)
        const materials = await LearningMaterial.find().sort({ uploadedAt: -1 });

        if (!materials.length) {
            return res.status(404).json({ success: false, message: "No learning materials found." });
        }

        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        console.error("Error fetching learning materials:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


// ✅ Export all controllers
module.exports = {
    getStudentProfile,
    uploadResume,
    getAppliedCompanies,
    applyToCompany,
    getUpcomingCompanies,
    getStudentTests,
    getStudentResult, 
    getAllAlumniStories,
    getLearningMaterial
};
