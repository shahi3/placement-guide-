import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FilledCompanies.css';

const FilledCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFilledCompanies = async () => {
            try {
                const token = localStorage.getItem('placement_user_token'); // JWT token
                if (!token) throw new Error('No token found'); // Handle missing token

                const response = await axios.get('http://localhost:3008/student/applied-companies', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCompanies(response.data.companies);
            } catch (err) {
                console.error('Error fetching filled companies:', err);
                setError('Failed to load applied companies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchFilledCompanies();
    }, []);

    if (loading) return <p>Loading applied companies...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="filled-companies-container">
            <h1>Applied Companies</h1>
            {companies.length === 0 ? (
                <p>No applied companies found.</p>
            ) : (
                <ul className="company-list">
                    {companies.map((company) => (
                        <li key={company._id} className="company-card">
                            <h2>{company.name}</h2>
                            <p><strong>Date Applied:</strong> {new Date(company.dateApplied).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {company.status || 'Pending'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilledCompanies;
