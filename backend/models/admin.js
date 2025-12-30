const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  mobileNumber: String,
  fullName: String,
  profilePicture: String,
  department: String,
  designation: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}, { collection: 'admins' }); // <-- important line

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
