import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const Viewcourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:8001/api/viewcourse')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    

    
    //delete record
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8001/api/deletecourse/${id}`)
            .then(response => {
                console.log(response.data.message);
                setCourses(courses.filter(course => course.courseID !== id));
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            }); 
    };
  

    return (
        <section className='flex flex-row'>
    <div className='flex-none bg-gray-800'>
        <Sidebar />
    </div>
    <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Courses Table</h2>
        <table className="min-w-full bg-white border border-separate border-gray-200 text-left">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Course ID</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Course Name</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Description</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Duration</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Course Fee</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Prerequirements</th>
                    <th className="py-3 px-4 border-b font-semibold text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                    <tr key={course.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}>
                        <td className="py-2 px-4 border-b">{course.courseID}</td>
                        <td className="py-2 px-4 border-b">{course.courseName}</td>
                        <td className="py-2 px-4 border-b">{course.description}</td>
                        <td className="py-2 px-4 border-b">{course.duration}</td>
                        <td className="py-2 px-4 border-b">₹{course.courseFee}</td>
                        <td className="py-2 px-4 border-b">{course.prerequirements}</td>
                        <td className="py-2 px-4 border-b flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(course.courseID)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</section>

    );
};

export default Viewcourses;
