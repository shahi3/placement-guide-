import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LearningMaterial.css';

const LearningMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploadData, setUploadData] = useState({ subject: '', pdf: null });

    const adminToken = sessionStorage.getItem('admin_token');

    const fetchMaterials = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get('http://localhost:3008/admin/learning-materials', {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setMaterials(res.data.data || []);
        } catch (err) {
            console.error(err);
            setError('❌ Could not fetch learning materials.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!uploadData.subject || !uploadData.pdf) {
                return setError('❌ Please enter subject and select a PDF file.');
            }

            const formData = new FormData();
            formData.append('subject', uploadData.subject);
            formData.append('pdf', uploadData.pdf);

            await axios.post('http://localhost:3008/admin/upload-learning-material', formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadData({ subject: '', pdf: null });
            fetchMaterials(); // Refresh list
        } catch (err) {
            console.error(err);
            setError('❌ Upload failed. Try again.');
        }
    };

    const handleDelete = async (id) => {
        setError('');
        try {
            await axios.delete(`http://localhost:3008/admin/delete-learning-material/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setMaterials((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error(err);
            setError('❌ Delete failed. Try again.');
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div className="learning-materials-container">
            <h1>📘 Learning Materials</h1>

            {error && <p className="error">{error}</p>}

            <form className="upload-form" onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Enter Subject Name"
                    value={uploadData.subject}
                    onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                    required
                />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setUploadData({ ...uploadData, pdf: e.target.files[0] })}
                    required
                />
                <button type="submit" className="upload-button">⬆️ Upload Material</button>
            </form>

            <button className="refresh-button" onClick={fetchMaterials}>🔄 Refresh List</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="material-list">
                    {materials.length === 0 ? (
                        <p>No learning materials available.</p>
                    ) : (
                        materials.map((material) => (
                            <li key={material._id} className="material-card">
                                <h2>{material.subject}</h2>
                                <a
                                    href={`http://localhost:3008${material.pdfUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="material-link"
                                >
                                    📄 View PDF
                                </a>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(material._id)}
                                >
                                    ❌ Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default LearningMaterial;
