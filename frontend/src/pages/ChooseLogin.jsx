
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChooseLogin.css';


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