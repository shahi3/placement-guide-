import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('placement_user_token'); // Clear student token on logout
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Placement Guide</h2>
            <nav>
                <ul className="sidebar-links">
                    <li><Link to="/student/results">Results</Link></li>
                    <li><Link to="/student/upcoming-companies">Upcoming Companies</Link></li>
                    <li><Link to="/student/tests">Tests</Link></li>
                    <li><Link to="/student/learning-materials">Learning Materials</Link></li> {/* Updated Route */}
                    <li><Link to="/student/alumni-stories">Alumni Stories</Link></li>
                    <li><Link to="/student/profile">Profile</Link></li>
                </ul>
            </nav>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
