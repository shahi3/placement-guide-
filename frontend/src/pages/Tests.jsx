import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Tests.css';

const TestDetails = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [enrollmentNumber, setEnrollmentNumber] = useState('');

    const fetchTests = async () => {
        try {
            const token = localStorage.getItem('placement_user_token'); // Fetch JWT token
            if (!token) throw new Error('No token found'); // Handle missing token
            if (!enrollmentNumber) throw new Error('Please enter an enrollment number'); // Validate input

            setLoading(true); // Start loading state
            console.log('Enrollment Number:', enrollmentNumber); // Debug enrollment number
            console.log('JWT Token:', token); // Debug token

            const response = await axios.get(
                `http://localhost:3008/student/upcoming-tests/${enrollmentNumber}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log('API Response:', response); // Debug API response

            // Handle the fetched test data
            setTests(response.data.data || []);
            setError(''); // Clear previous errors
        } catch (err) {
            console.error('Error fetching tests:', err);
            if (err.response && err.response.status === 404) {
                setError('No tests found for the provided enrollment number.');
            } else if (err.message === 'No token found') {
                setError('User authentication token not found. Please log in again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
            setTests([]); // Clear previous results if any
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTests();
    };

    return (
        <div className="test-details-container">
            <h1>Check Your Test Details</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <label htmlFor="enrollment-input">Enter Enrollment Number:</label>
                <input
                    id="enrollment-input"
                    type="text"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    required
                    placeholder="e.g., UU2209000345"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p className="loading-message">Loading tests...</p>}
            {error && <p className="error-message">{error}</p>}

            {tests.length === 0 && !loading && !error && (
                <p className="no-tests-message">No tests found for this enrollment number.</p>
            )}

            {tests.length > 0 && (
                <ul className="test-list">
                    {tests.map((test, index) => (
                        <li key={index} className="test-card">
                            <h2>{test.companyName}</h2>
                            <p><strong>Test Date:</strong> {new Date(test.testDate).toLocaleString()}</p>
                            <p><strong>Location:</strong> {test.location || 'Online'}</p>
                            <p><strong>Description:</strong> {test.description || 'No description available'}</p>
                            <p><strong>Test Link:</strong> <a href={test.testLink} target="_blank" rel="noopener noreferrer">Start Test</a></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TestDetails;
