import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminStyles.css'

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('placement_user_token');
                const response = await axios.get('http://localhost:3008/admin/students', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudents(response.data.students);
            } catch (err) {
                setError('Failed to fetch students.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('placement_user_token');
            await axios.delete(`http://localhost:3008/admin/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudents(students.filter((student) => student._id !== id));
        } catch (err) {
            alert('Failed to delete student.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-page">
            <h1>Manage Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.department}</td>
                            <td>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudents;
