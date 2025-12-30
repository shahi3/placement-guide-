import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GroupedStudents.css';

const GroupedStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = sessionStorage.getItem('admin_token');
        if (!token) {
          console.error('No token found in sessionStorage');
          return;
        }
        const res = await axios.get('http://localhost:3008/admin/all-student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p className="loading-text">Loading students...</p>;

  if (!students.length) {
    return (
      <div className="students-container">
        <h2>All Students</h2>
        <p className="no-data-text">No students found.</p>
      </div>
    );
  }

  return (
    <div className="students-container">
      <h2>All Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Course Year</th>
            <th>Marks (10th)</th>
            <th>Marks (12th)</th>
            <th>Enrollment Number</th>
            <th>Mobile Number</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student._id || idx}>
              <td>{idx + 1}</td>
              <td>{student.name || 'N/A'}</td>
              <td>{student.email || 'N/A'}</td>
              <td>{student.role || 'N/A'}</td>
              <td>{student.courseYear || 'N/A'}</td>
              <td>{student.marks10 || 'N/A'}%</td>
              <td>{student.marks12 || 'N/A'}%</td>
              <td>{student.enrollmentNumber || 'N/A'}</td>
              <td>{student.mobileNumber || 'N/A'}</td>
              <td>{student.department || 'N/A'}</td>
              <td>
                {student.dateOfBirth
                  ? new Date(student.dateOfBirth).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                {student.resume ? (
                  <a href={student.resume} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                ) : (
                  'Not uploaded'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedStudents;
