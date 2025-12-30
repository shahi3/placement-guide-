// src/pages/AdminDashboard.jsx
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AdminSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar />

                {/* Main content area for nested routes */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default AdminDashboard;
