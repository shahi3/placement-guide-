import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ManageAlumniStory.css';

const ManageAlumniStory = () => {
    const [formData, setFormData] = useState({ name: '', story: '', year: '', image: null });
    const [message, setMessage] = useState('');
    const [stories, setStories] = useState([]);
    const [viewStories, setViewStories] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('admin_token'); // ✅ Use sessionStorage consistently
        if (!token) {
            setMessage('❌ Authorization token missing.');
            return;
        }

        const requestData = new FormData();
        Object.keys(formData).forEach((key) => requestData.append(key, formData[key]));

        try {
            await axios.post('http://localhost:3008/admin/upload-story', requestData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });

            setMessage('✅ Alumni story uploaded successfully!');
            setFormData({ name: '', story: '', year: '', image: null }); // ✅ Reset Form After Upload
        } catch (error) {
            console.error('Error uploading story:', error);
            setMessage('❌ Failed to upload story.');
        }
    };

    const handleViewStories = async () => {
        const token = sessionStorage.getItem('admin_token'); // ✅ Use sessionStorage consistently
        if (!token) {
            setMessage('❌ Authorization token missing.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3008/admin/stories', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStories(response.data.data || []);
            setViewStories(true); // ✅ Show the stories section
        } catch (error) {
            console.error('Error fetching stories:', error);
            setMessage('❌ Failed to fetch stories.');
        }
    };

    return (
        <div className="manage-alumni-container">
            <h2>Upload Alumni Story</h2>

            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit} className="upload-form">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

                <label>Story</label>
                <textarea name="story" value={formData.story} onChange={handleInputChange} required rows={4} />

                <label>Graduation Year</label>
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} required />

                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

                <button type="submit">Upload Story</button>
            </form>

            <button className="view-stories-button" onClick={handleViewStories}>
                View All Stories
            </button>

            {viewStories && (
                <div>
                    <h3>Existing Alumni Stories</h3>
                    <ul className="story-list">
                        {stories.map(story => (
                            <li key={story._id} className="story-card">
                                <h4>{story.name} ({story.year})</h4>
                                <p>{story.story}</p>
                                {story.image && (
                                    <img src={`http://localhost:3008/uploads/stories/${story.image}`} alt={story.name} />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ManageAlumniStory;
