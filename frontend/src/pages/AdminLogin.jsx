import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3008/placementguide/login', loginInfo);
            if (response.data.success) {
                sessionStorage.setItem('admin_token', response.data.token); // Save token securely
                navigate('/admin/manage-students'); // Redirect to admin dashboard
            } else {
                setError(response.data.message); // Backend-defined error message
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in. Please try again.');
        }
    };

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        required
                        aria-label="Email Address"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        required
                        aria-label="Password"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
