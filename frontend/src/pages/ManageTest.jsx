import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ManageTest.css';

const ManageTest = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [testLink, setTestLink] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('admin_token');
        if (!token) {
            setMessage("❌ Authorization token not found. Please log in again.");
            return;
        }

        const testData = {
            enrollmentNumber,
            companyName,
            date,
            description,
            testLink,
            location,
        };

        try {
            const response = await axios.post('http://localhost:3008/admin/add-test', testData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessage('✅ Test assigned successfully!');
            setEnrollmentNumber('');
            setCompanyName('');
            setDate('');
            setDescription('');
            setTestLink('');
            setLocation('');
        } catch (error) {
            console.error('Error assigning test:', error.response?.data || error.message);
            setMessage('❌ Failed to assign test. Please try again.');
        }
    };

    return (
        <div className="manage-test-container">
            <h2>Assign Test to Student</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="manage-test-form">
                <label>Enrollment Number</label>
                <input
                    type="text"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    required
                    placeholder="Enter enrollment number"
                />

                <label>Company Name</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="Enter company name"
                />

                <label>Test Date</label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Enter test details"
                />

                <label>Test Link</label>
                <input
                    type="url"
                    value={testLink}
                    onChange={(e) => setTestLink(e.target.value)}
                    required
                    placeholder="Enter test link"
                />

                <label>Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="Enter test location"
                />

                <button type="submit">Assign Test</button>
            </form>
        </div>
    );
};

export default ManageTest;
