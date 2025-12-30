import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminStyles.css';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({ students: 0, companies: 0, tests: 0, results: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Retrieve admin token from sessionStorage
    const adminToken = sessionStorage.getItem('admin_token');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError('');

                // API call to fetch analytics
                const response = await axios.get('http://localhost:3008/admin/dashboard-analytics', {
                    headers: { Authorization: `Bearer ${adminToken}` },
                });

                // Update stats with response data
                setStats(response.data.data);
            } catch (err) {
                console.error("Error fetching analytics:", err);
                if (err.response) {
                    console.error("Response Error:", err.response.data);
                }
                setError('❌ Could not fetch analytics. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics(); // Fetch analytics data on component mount
    }, []);

    return (
        <div className="admin-page">
            <h1>Admin Analytics</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
                <div className="analytics-container">
                    <div className="analytics-card">
                        <h2>{stats.students}</h2>
                        <p>Total Students</p>
                    </div>
                    <div className="analytics-card">
                        <h2>{stats.companies}</h2>
                        <p>Total Companies</p>
                    </div>
                    <div className="analytics-card">
                        <h2>{stats.tests}</h2>
                        <p>Total Tests</p>
                    </div>
                    <div className="analytics-card">
                        <h2>{stats.results}</h2>
                        <p>Total Results</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
