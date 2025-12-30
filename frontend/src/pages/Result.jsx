import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Result.css';

const Result = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [enrollmentNumber, setEnrollmentNumber] = useState('');

    const fetchResults = async () => {
        try {
            const token = localStorage.getItem('placement_user_token'); // JWT token
            if (!token) throw new Error('No token found'); // Handle missing token
            if (!enrollmentNumber) throw new Error('Please enter an enrollment number'); // Ensure input is provided

            const response = await axios.get(`http://localhost:3008/student/result/${enrollmentNumber}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setResults(response.data.data || []); // Handle empty results safely
        } catch (err) {
            console.error('Error fetching results:', err);
            setError('Failed to load results. Please check your enrollment number and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        fetchResults();
    };

    return (
        <div className="result-container">
            <h1>Check Your Results</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <label>Enter Enrollment Number:</label>
                <input
                    type="text"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    required
                    placeholder="e.g., 345325353"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading results...</p>}
            {error && <p className="error">{error}</p>}

            {results.length === 0 && !loading && !error && (
                <p>No results found for this enrollment number.</p>
            )}

            {results.length > 0 && (
                <ul className="result-list">
                    {results.map((result, index) => (
                        <li key={index} className="result-card">
                            <h2>{result.companyName}</h2>
                            <p><strong>Result:</strong> {result.result}</p>
                            <p><strong>Cleared Round:</strong> {result.clearedRound}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Result;
