import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/StudentLogin.css';

function StudentLogin() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

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
                // Save user info and token
                localStorage.setItem('placement_user', JSON.stringify(result.user || email));
                localStorage.setItem('placement_user_token', result.token); // Save token

                handleSuccess(result.message);

                setTimeout(() => {
                    navigate('/student'); // ✅ Redirects to dashboard layout with Navbar & Footer
                }, 1000);
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
                        autoComplete="username"
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
                        autoComplete="current-password"
                        placeholder="Enter your password..."
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="signup-link-container">
                <p>Don't have an account? <Link to="/student-signup" className="signup-link">Sign Up</Link></p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default StudentLogin;
