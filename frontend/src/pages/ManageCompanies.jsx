import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ManageCompanies.css';

const ManageCompanies = () => {
  const [companyName, setCompanyName] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [googleFormLink, setGoogleFormLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('admin_token');

    if (!token) {
      setMessage("❌ Authorization token not found. Please log in again.");
      return;
    }

    const companyData = {
      name: companyName,
      eligibility,
      description,
      department,
      applicationDeadline,
      googleFormLink,
    };

    try {
      const response = await axios.post(
        'http://localhost:3008/admin/add-company',
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('✅ Company added successfully!');
      setCompanyName('');
      setEligibility('');
      setDescription('');
      setDepartment('');
      setApplicationDeadline('');
      setGoogleFormLink('');
    } catch (error) {
      console.error('Error adding company:', error.response?.data || error.message);
      setMessage('❌ Failed to add company. Please try again.');
    }
  };

  return (
    <div className="manage-companies-container">
      <h2>Add New Company</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="manage-companies-form">
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          placeholder="Enter company name"
        />

        <label>Eligibility</label>
        <input
          type="text"
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          required
          placeholder="e.g., 7.0 CGPA"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Enter company description"
        />

        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          placeholder="e.g., CSE"
        />

        <label>Application Deadline</label>
        <input
          type="datetime-local"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
          required
        />

        <label>Google Form Link</label>
        <input
          type="url"
          value={googleFormLink}
          onChange={(e) => setGoogleFormLink(e.target.value)}
          required
          placeholder="Enter Google Form link"
        />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
};

export default ManageCompanies;
