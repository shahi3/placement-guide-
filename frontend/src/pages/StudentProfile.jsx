import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const StudentProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('placement_user_token');
                if (!token) throw new Error('No token found');

                const response = await axios.get('http://localhost:3008/student/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfile(response.data.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile. Please log in again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return profile ? (
        <div className="profile-container">
            <h1>{profile.email}'s Profile</h1>
            <p><strong>Course Year:</strong> {profile.courseYear}</p>
            <p><strong>10th Marks:</strong> {profile.marks10}%</p>
            <p><strong>12th Marks:</strong> {profile.marks12}%</p>
            <p><strong>Enrollment Number:</strong> {profile.enrollmentNumber}</p>
            <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
        </div>
    ) : (
        <p>Profile not found.</p>
    );
};

export default StudentProfile;
