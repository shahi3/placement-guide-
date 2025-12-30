# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
/frontend
  /src
    /components
      ├── Navbar.jsx
      ├── Sidebar.jsx
      ├── AdminSidebar.jsx        ➜ Admin-specific sidebar
      ├── ProtectedRoute.jsx      ➜ (Optional) To protect admin routes
    /pages
      ├── Home.jsx                ➜ Student Home
      ├── Companies.jsx
      ├── Results.jsx
      ├── UpcomingCompanies.jsx
      ├── Tests.jsx
      ├── FilledCompanies.jsx
      ├── LearningMaterial.jsx
      ├── Profile.jsx
      ├── Login.jsx               ➜ Student Login
      ├── ChooseLogin.jsx         ➜ Login as Student or Admin
      ├── AdminLogin.jsx          ➜ Admin Login
      ├── AdminDashboard.jsx      ➜ Admin Home
      ├── ManageCompanies.jsx     ➜ Admin - Add/Edit/Delete Companies
      ├── ManageResults.jsx       ➜ Admin - Manage Placement Results
      ├── ManageTests.jsx         ➜ Admin - Manage Tests
      ├── ManageLearning.jsx      ➜ Admin - Manage Learning Material
      ├── ViewStudents.jsx        ➜ Admin - View Student Profiles and Resumes
    /styles
      ├── App.css
      ├── Login.css
      ├── ChooseLogin.css
      ├── AdminLogin.css
      ├── AdminDashboard.css
      ├── ManageCompanies.css
      ├── ManageResults.css
      ├── ManageTests.css
      ├── ManageLearning.css
      ├── ViewStudents.css
    App.jsx
    main.jsx
frontend/
└── src/
    ├── assets/                    # Images, icons, etc.
    │
    ├── components/                # Reusable components (generic)
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx            # Student sidebar
    │   ├── AdminSidebar.jsx       # Admin sidebar
    │   ├── CompanyCard.jsx
    │   ├── LearningMaterialCard.jsx
    │   ├── TestCard.jsx
    │   ├── ProtectedRoute.jsx     # For student routes (if needed)
    │   ├── AdminProtectedRoute.jsx
    │   ├── Layout/                # Layouts for students and admins
    │   │   ├── StudentLayout.jsx
    │   │   └── AdminLayout.jsx
    │
    ├── pages/                     # All pages organized by user type
    │   ├── Student/               # Student dashboard pages
    │   │   ├── Home.jsx
    │   │   ├── Companies.jsx
    │   │   ├── UpcomingCompanies.jsx
    │   │   ├── Tests.jsx
    │   │   ├── FilledCompanies.jsx
    │   │   ├── LearningMaterial.jsx
    │   │   ├── Results.jsx
    │   │   └── Profile.jsx
    │   │
    │   ├── Admin/                 # Admin dashboard pages
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ManageCompanies.jsx
    │   │   ├── ManageResults.jsx
    │   │   ├── ManageTests.jsx
    │   │   ├── ManageLearning.jsx
    │   │   ├── ViewStudents.jsx
    │   │
    │   └── Auth/                  # Login/registration for both users
    │       ├── ChooseLogin.jsx
    │       ├── Login.jsx          # Student login
    │       └── AdminLogin.jsx     # Admin login
    │
    ├── styles/                    # CSS files (optional SCSS later)
    │   ├── common.css             # Shared/common styles
    │   ├── Navbar.css
    │   ├── Sidebar.css
    │   ├── AdminSidebar.css
    │   ├── Student/               # Student specific page styles
    │   │   ├── Home.css
    │   │   ├── Companies.css
    │   │   ├── UpcomingCompanies.css
    │   │   ├── Tests.css
    │   │   ├── FilledCompanies.css
    │   │   ├── LearningMaterial.css
    │   │   ├── Results.css
    │   │   └── Profile.css
    │   └── Admin/                 # Admin specific page styles
    │       ├── AdminDashboard.css
    │       ├── ManageCompanies.css
    │       ├── ManageResults.css
    │       ├── ManageTests.css
    │       ├── ManageLearning.css
    │       ├── ViewStudents.css
    │
    ├── App.jsx                    # Main component & routes
    ├── main.jsx                   # React app entry point
    └── index.css                  # Global styles (optional)
placement-guide/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── pages/
│   │   ├── ChooseLogin.jsx
│   │   ├── StudentLogin.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Home.jsx
│   │   └── AdminDashboard.jsx
│   ├── styles/
│   │   └── Login.css
│   ├── assets/
│   │   └── logo.png (optional)
│   └── components/
│       └── Header.jsx (optional shared components like Navbar)
├── package.json
└── README.md
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminLogin() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = loginInfo;
        if (username === 'admin' && password === 'admin123') {
            handleSuccess('Logged in as Admin!');
        } else {
            handleError('Invalid credentials');
        }
    };

    const handleSuccess = (message) => toast.success(message);
    const handleError = (error) => toast.error(error);

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username..."
                        value={loginInfo.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AdminLogin;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseLogin() {
    const navigate = useNavigate();

    return (
        <div className="choose-container">
            <h1>Welcome to Placement Portal</h1>
            <div className="buttons-container">
                <button className="login-button admin" onClick={() => navigate('/admin-login')}>
                    Admin Login
                </button>
                <button className="login-button student" onClick={() => navigate('/student-login')}>
                    Student Login
                </button>
            </div>
        </div>
    );
}

export default ChooseLogin;
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentLogin() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const response = await fetch('http://localhost:3008/placementguide/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError('Something went wrong');
        }
    };

    const handleSuccess = (message) => toast.success(message);
    const handleError = (error) => toast.error(error);

    return (
        <div className="student-login-container">
            <h1>Student Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={loginInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default StudentLogin;
 Placement Guide project — it's a platform for campus recruitment with both student and admin panels.

Here's a quick recap of what I know:

👨‍🎓 Student Panel:
Login with student credentials.

After login, they get:

Home: Upcoming companies, tests, filled forms, and their results.

Content: Syllabus-related PDFs (uploaded by admin).

Alumni Section: Chat + placed student stories.

Profile: Shows student details with options like logout, change password, upload resume.

🧑‍💼 Admin Panel:
Add companies and test info.

Upload learning materials.

Add alumni stories.

View student resumes.

Shortlist students and manage results.

You're building the frontend in React using Vite, React Router, and Bootstrap, with a clean blue, black, and white color theme.

[
  {
    "email": "rahul_verma@example.com",
    "password": "RahulPass123",
    "courseYear": 2,
    "marks10": 89,
    "marks12": 94,
    "enrollmentNumber": "EN98765432",
    "mobileNumber": "9876543210",
    "department": "Information Technology",
    "dateOfBirth": "2003-06-15"
  },
  {
    "email": "anita_sharma@example.com",
    "password": "AnitaPass123",
    "courseYear": 4,
    "marks10": 80,
    "marks12": 85,
    "enrollmentNumber": "EN87654321",
    "mobileNumber": "8976543201",
    "department": "Electronics and Communication",
    "dateOfBirth": "2001-03-20"
  },
  {
    "email": "vishal_singh@example.com",
    "password": "VishalPass123",
    "courseYear": 3,
    "marks10": 88,
    "marks12": 90,
    "enrollmentNumber": "EN76543210",
    "mobileNumber": "9876789102",
    "department": "Mechanical Engineering",
    "dateOfBirth": "2002-09-10"
  }
]
