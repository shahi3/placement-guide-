import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-body">
                <Sidebar />
                <main className="dashboard-main">
                    <Outlet /> {/* Child routes like Profile, Applied Companies, etc. */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
