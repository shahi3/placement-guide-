import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpcomingCompanies.css';

const UpcomingCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('placement_user_token'); // JWT token
                if (!token) throw new Error('No token found'); // Handle missing token

                const response = await axios.get('http://localhost:3008/student/upcoming-companies', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setCompanies(response.data.companies); // Assign companies from API response
            } catch (err) {
                console.error('Error fetching companies:', err);
                setError('Failed to load upcoming companies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    if (loading) return <p>Loading companies...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="upcoming-companies-container">
            <h1>Upcoming Companies</h1>
            {companies.length === 0 ? (
                <p>No upcoming companies at the moment.</p>
            ) : (
                <ul className="company-list">
                    {companies.map((company) => (
                        <li key={company._id} className="company-card">
                            <h2>{company.name}</h2>
                            <p><strong>Eligibility:</strong> {company.eligibility}</p>
                            <p><strong>Description:</strong> {company.description || 'No description available'}</p>
                            <p><strong>Application Deadline:</strong> {new Date(company.applicationDeadline).toLocaleDateString()}</p>
                            <p>
                                <strong>Google Form:</strong>{' '}
                                <a href={company.googleFormLink} target="_blank" rel="noopener noreferrer">
                                    Apply Here
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UpcomingCompanies;
