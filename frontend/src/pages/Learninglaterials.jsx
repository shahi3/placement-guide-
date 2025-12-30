import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LearningMaterial.css';

const LearningMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const studentToken = localStorage.getItem('placement_user_token'); // Retrieve student token

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.get('http://localhost:3008/student/learningmaterial', {
                headers: { Authorization: `Bearer ${studentToken}` }
            });

            setMaterials(response.data.data || []); // Populate materials or fallback to empty array
        } catch (err) {
            console.error('Error fetching learning materials:', err);
            setError('❌ Could not fetch learning materials. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials(); // Fetch learning materials on component mount
    }, []);

    return (
        <div className="learning-materials-container">
            <h1>📘 Learning Materials</h1>

            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <ul className="material-list">
                    {materials.length === 0 ? (
                        <p>No learning materials available.</p>
                    ) : (
                        materials.map((material, index) => (
                            <li key={index} className="material-card">
                                <h2>{material.title}</h2>
                                <p><strong>Subject:</strong> {material.subject || 'No subject available'}</p> {/* Display subject */}
                                <p><strong>Description:</strong> {material.description || 'No description available'}</p>
                                <a
                                    href={material.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="material-link"
                                >
                                    📄 View Material
                                </a>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default LearningMaterials;
