import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useHandleAuthError } from './ErrorAuth';

const Addbatches = () => {
    const [courses, setCourses] = useState([]);
    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [course_name, setCourse_name] = useState('');
    const [courseID, setCourseID] = useState('');
    const [error, setError] = useState('');
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `${token}`;
        // Fetch courses to populate the dropdown
        axios.get('http://localhost:8001/api/viewcourse')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                try {
                  handleAuthError(error);
                } catch (err) {
                  console.log(err.message);
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `${token}`;

        const newBatch = { batchName, startDate, endDate, course_name, courseID };

        axios.post('http://localhost:8001/api/addbatches', newBatch)
            .then(response => {
                toast.success('Batch Created successfully!', { autoClose: 1000 });

                setBatchName('');
                setStartDate('');
                setEndDate('');
                setCourse_name('');
                setCourseID('');
                setError('');
            })
            .catch(error => {
                try {
                  handleAuthError(error);
                } catch (err) {
                  console.log(err.message);
                }
            });
    };

    const handleCourseChange = (e) => {
        const selectedCourseName = e.target.value;
        setCourse_name(selectedCourseName);

        // Find the courseID for the selected course_name
        const selectedCourse = courses.find(course => course.course_name === selectedCourseName);
        if (selectedCourse) {
            setCourseID(selectedCourse.courseID);
        }
    };

    return (
        <section className="flex h-screen">
            <div className="App">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8 flex-1 overflow-auto">
                    <div className="flex-grow flex justify-center items-center  bg-gray-100 p-4 sm:p-8">
                        <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
                            <h2 className="text-2xl font-bold mb-4 text-center">Create New Batch</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Batch Name:</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded"
                                        value={batchName}
                                        onChange={(e) => setBatchName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Start Date:</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border rounded"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">End Date:</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border rounded"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Course:</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded"
                                        value={course_name}
                                        onChange={handleCourseChange}
                                        required
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.courseID} value={course.course_name}>
                                                {course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    Add Batch
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addbatches;
