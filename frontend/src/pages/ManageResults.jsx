import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ManageResult.css';

const ManageResults = () => {
    const [formData, setFormData] = useState({
        enrollmentNumber: '',
        companyName: '',
        result: '',
        clearedRound: '',
    });

    const [message, setMessage] = useState(''); // Feedback message for success or error

    // Handle input changes
    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('admin_token'); // Get token from sessionStorage
            if (!token) {
                throw new Error('Unauthorized: Admin token is missing.');
            }

            const response = await axios.post('http://localhost:3008/admin/add-result', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                // Clear form data on success and set success message
                setMessage('Result added successfully!');
                setFormData({
                    enrollmentNumber: '',
                    companyName: '',
                    result: '',
                    clearedRound: '',
                });
            } else {
                throw new Error(response.data.message || 'Failed to add result.');
            }
        } catch (err) {
            console.error('Error adding result:', err.message);
            setMessage(err.response?.data?.message || 'An error occurred while adding the result.');
        }
    };

    return (
        <div className="manage-results-container">
            <h1>Add New Placement Result</h1>
            {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}

            <form onSubmit={handleSubmit} className="add-result-form">
                <div className="form-group">
                    <label>Enrollment Number</label>
                    <input
                        type="text"
                        name="enrollmentNumber"
                        value={formData.enrollmentNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter student's enrollment number"
                    />
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        placeholder="Enter the company name"
                    />
                </div>
                <div className="form-group">
                    <label>Result</label>
                    <select
                        name="result"
                        value={formData.result}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select result</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Cleared Round</label>
                    <input
                        type="text"
                        name="clearedRound"
                        value={formData.clearedRound}
                        onChange={handleChange}
                        required
                        placeholder="Enter cleared round (e.g., HR Interview)"
                    />
                </div>
                <button type="submit" className="btn-submit">Add Result</button>
            </form>
        </div>
    );
};

export default ManageResults;
