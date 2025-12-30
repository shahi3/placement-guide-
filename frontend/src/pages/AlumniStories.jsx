import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AlumniStories.css';

const AlumniStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlumniStories = async () => {
            try {
                const token = localStorage.getItem('placement_user_token'); // ✅ Correctly retrieve token
                if (!token) {
                    throw new Error('Authorization token missing.');
                }

                const response = await axios.get('http://localhost:3008/student/view-alumni', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setStories(response.data.data || []);
            } catch (err) {
                console.error('Error fetching alumni stories:', err);
                setError('Failed to load alumni stories.');
            } finally {
                setLoading(false);
            }
        };

        fetchAlumniStories();
    }, []);

    return (
        <div className="alumni-container">
            <h1>Alumni Stories</h1>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p className="loading">Loading stories...</p>
            ) : (
                <div className="stories-grid">
                    {stories.map((story) => (
                        <div key={story._id} className="story-card">
                            {story.image && (
                                <img src={`http://localhost:3008/uploads/stories/${story.image}`} alt={story.name} className="story-image" />
                            )}
                            <div className="story-details">
                                <h2>{story.name} ({story.year})</h2>
                                <p>{story.story}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlumniStories;
