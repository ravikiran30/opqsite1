import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHandleAuthError } from './ErrorAuth';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `${token}`;
        // Fetch courses including toggle state
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

    // Delete course
    const deleteCourse = (id) => {
        axios.delete(`http://localhost:8001/api/deletecourse/${id}`)
            .then(response => {
                console.log(response.data.message);
                setCourses(courses.filter(course => course.courseID !== id));
            })
            .catch(error => {
                console.error('Error deleting Course:', error);
            });
    };
    const handleView = (courseID) => {
        navigate(`/course/${courseID}`);
    };

     //to update the status of courses
     const handleStatusChange = (id, status) => {
        axios.put(`http://localhost:8001/api/coursetosite/${id}`, { status })
            .then(response => {
                setCourses(courses.map(enquiry =>
                    enquiry.courseID === id ? { ...enquiry, status } : enquiry
                    
                ));
                if (status === 'done') {
                    toast.success('Course added to the website successfully' , { autoClose: 1000 });
                } else {
                    toast.info('Course removed from the website', { autoClose: 1000 });
                }
                
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    //download in excel format
    const exportToExcel = (tableData, fileName) => {
        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    

    return (
        <section className="flex h-screen">
            <div className="App">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-auto">
                    <div className="p-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Courses Table</h2>

                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-3 text-left">Course ID</th>
                                    <th className="p-3 text-left">Category</th>
                                    <th className="p-3 text-left">Course Name</th>
                                    <th className="p-3 text-left">Course Fee</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Actions</th>
                                    <th className="p-3 text-left">Add to Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr
                                        key={course.courseID}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                                    >
                                        <td className="p-3">{course.courseID}</td>
                                        <td className="p-3">{course.category}</td>
                                        <td className="p-3">
                                            <a href={course.course_url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                                {course.course_name}
                                            </a>
                                        </td>
                                        <td className="p-3">₹{course.course_fee}</td>
                                        <td className="p-3">{course.short_description}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-blue-500" onClick={() => handleView(course.courseID)} data-tooltip-id="viewmore" data-tooltip-content="View More">
                                                <FaEye />
                                                <Tooltip id="viewmore" place="left" effect="solid" />
                                            </button>
                                            <button className="text-red-500" onClick={() => deleteCourse(course.courseID)} data-tooltip-id="delete" data-tooltip-content="Delete">
                                                <FaTrash />
                                                <Tooltip id="delete" place="right" effect="solid" />
                                            </button>
                                        </td>

                                        <td className="p-3">
                                        <input
                                                        type="checkbox"
                                                        className="h-5 w-5 text-green-600  rounded text-green-600 focus:ring-green-600"
                                                        checked={course.status === 'done'}
                                                        onChange={(e) => handleStatusChange(course.courseID, e.target.checked ? 'done' : 'pending')}
                                                    />
                                            {/* <span
                                                className={`ml-3 text-sm font-medium ${course.toggle ? 'text-green-500' : 'text-red-500'}`}
                                            >
                                                {course.toggle ? 'ON' : 'OFF'}
                                            </span> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => exportToExcel(courses, 'Courses_Lists')}
                            className="bg-blue-500 text-white p-2 rounded mt-4 flex hover:bg-blue-700 justify-end"

                        >
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllCourses;
