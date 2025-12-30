require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db'); // MongoDB connection file

// Routes
const authRoutes = require('./routes/auth-routes');
const studentRoutes = require('./routes/Student-routes');
const adminRoutes = require('./routes/admin-routes');

const app = express();
const PORT = process.env.PORT || 3008;

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL (change if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(express.json()); // This is critical for req.body to work
app.use('/uploads', express.static('uploads')); // For serving static files

// Routes
app.use('/placementguide', authRoutes); // For authentication routes
app.use('/student', studentRoutes); // For student-related routes
app.use('/admin', adminRoutes); // For admin routes like add-company, add-test, etc.

// Database connection
connectToDB();

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
