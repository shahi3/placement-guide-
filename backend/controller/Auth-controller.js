const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Student = require('../models/student');

// Register
const registerUser = async (req, res) => {
  try {
    const {
      email, password, role, fullName, mobileNumber, department,
      designation, profilePicture, courseYear, marks10, marks12,
      enrollmentNumber, dateOfBirth
    } = req.body;

    const Model = role === 'admin' ? Admin : Student;
    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      email,
      password: hashedPassword,
      role: role || 'student',
      ...(role === 'admin'
        ? { fullName, mobileNumber, department, designation, profilePicture }
        : { courseYear, marks10, marks12, enrollmentNumber, mobileNumber, department, dateOfBirth }
      )
    });

    await newUser.save();
    return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = 'admin';

    if (!user) {
      user = await Student.findOne({ email });
      role = 'student';
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (role === 'admin') {
      user.lastLogin = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { userid: user._id, email: user.email, role },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: '15m' }
    );

    return res.status(200).json({ success: true, message: 'Logged in successfully', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };
