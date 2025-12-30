import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChooseLogin from './pages/ChooseLogin';
import StudentLogin from './pages/StudentLogin';
import StudentSignUp from './pages/StudentSignUp';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import AppliedCompanies from './pages/AppliedCompanies';
import FilledCompanies from './pages/FilledCompanies';
import UpcomingCompanies from './pages/UpcomingCompanies';
import Tests from './pages/Tests';
import Result from './pages/Result';
import AlumniStories from './pages/AlumniStories';
import LearningMaterials from './pages/Learninglaterials';

import AdminDashboard from './pages/AdminDashboard';
import ManageStudents from './pages/ManageStudents';
import ManageCompanies from './pages/ManageCompanies';
import ManageTest from './pages/ManageTest';
import ManageResults from './pages/ManageResults';
import ManageAlumniStory from './pages/ManageAlumniStory';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminLogin from './pages/AdminLogin';
import LearningMaterial from './pages/LearningMaterial';
import GroupedStudents from './pages/GroupedStudents';

function App() {
    return (
        <Router>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<ChooseLogin />} />

                {/* Authentication */}
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/student-signup" element={<StudentSignUp />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Student Dashboard Routes */}
                <Route path="/student/*" element={<StudentDashboard />}>
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="applied-companies" element={<AppliedCompanies />} />
                    <Route path="filled-companies" element={<FilledCompanies />} />
                    <Route path="upcoming-companies" element={<UpcomingCompanies />} />
                    <Route path="tests" element={<Tests />} />
                    <Route path="results" element={<Result />} />
                    <Route path="alumni-stories" element={<AlumniStories />} />
                    <Route path="learning-materials" element={<LearningMaterials />} /> {/* Updated Route */}
                </Route>

                {/* Admin Dashboard Routes */}
                <Route path="/admin/*" element={<AdminDashboard />}>
                    <Route path="manage-students" element={<ManageStudents />} />
                    <Route path="manage-companies" element={<ManageCompanies />} />
                    <Route path="manage-tests" element={<ManageTest />} />
                    <Route path="manage-results" element={<ManageResults />} />
                    <Route path="manage-alumni-stories" element={<ManageAlumniStory />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="learning-materials" element={<LearningMaterial />} />
                    <Route path="grouped-students" element={<GroupedStudents />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
