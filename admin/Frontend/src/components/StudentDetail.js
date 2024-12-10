import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
    const { studentID } = useParams();
    const [student, setStudent] = useState({});
    const [stucourse, setStucourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8001/api/students/${studentID}`)
            .then(response => {
                console.log(response.data);
                setStudent(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                setLoading(false);
            });

        axios.get(`http://localhost:8001/api/viewstudentdetails/${studentID}`)
            .then(response => {
                console.log(response.data);
                setStucourse(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching student course data:', error);
                setLoading(false);
            });
    }, [studentID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        });
    };

    const handleSave = () => {
        console.log('Saving student data:', student);
        axios.put(`http://localhost:8001/api/studentedit/${studentID}`, student)
            .then(response => {
                console.log('Student updated successfully:', response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating student:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex h-screen">
            <Sidebar className="w-1/5" />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 p-6 overflow-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Student Details</h2>
                    <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={`http://localhost:8001/uploads/${student.photo}`}
                                alt={`${student.firstName} ${student.lastName}`}
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">
                                {student.firstName} {student.lastName}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 ">
                            <div className=''>
                                <p className='mb-4'><strong className="font-semibold ">Student ID:&nbsp;&nbsp;&nbsp;</strong> {student.studentID}</p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">Email:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="email" 
                                            value={student.email} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">Phone Number:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="phoneNumber" 
                                            value={student.phoneNumber} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        student.phoneNumber
                                    )}
                                </p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">Date of Birth:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="date" 
                                            name="dateOfBirth" 
                                            value={student.dateOfBirth} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        new Date(student.dateOfBirth).toLocaleDateString()
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className='mb-4'>
                                    <strong className="font-semibold m">Address:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="address" 
                                            value={student.address} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        student.address
                                    )}
                                </p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">City:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="city" 
                                            value={student.city} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        student.city
                                    )}
                                </p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">State:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="state" 
                                            value={student.state} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        student.state
                                    )}
                                </p>
                                <p className='mb-4'>
                                    <strong className="font-semibold ">Enrollment Date:&nbsp;&nbsp;&nbsp;</strong> 
                                    {isEditing ? (
                                        <input 
                                            type="date" 
                                            name="enrollmentDate" 
                                            value={student.enrollmentDate} 
                                            onChange={handleInputChange} 
                                            className="border p-2 rounded"
                                        />
                                    ) : (
                                        new Date(student.enrollmentDate).toLocaleDateString()
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            {isEditing ? (
                                <>
                                    <button 
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-6 mb-6"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Batch Details Section */}
                        <div className="mt-8">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Batch Details</h3>
                            <tr/>
                            {stucourse.map((course, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
                                    <p>
                                        <strong className="font-semibold">Batch Name:&nbsp;&nbsp;&nbsp;</strong> 
                                        {course.batchName}
                                    </p>
                                    <p>
                                        <strong className="font-semibold">Course Name:&nbsp;&nbsp;&nbsp;</strong> 
                                        {course.course_name}
                                    </p>
                                    <p>
                                        <strong className="font-semibold">Start Date:&nbsp;&nbsp;&nbsp;</strong> 
                                        {new Date(course.startDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong className="font-semibold">End Date:&nbsp;&nbsp;&nbsp;</strong> 
                                        {new Date(course.endDate).toLocaleDateString()}
                                    </p>
                                    <tr/>
                                    <tr/>
                                    <tr/>
                                </div>
                            ))}
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentDetails;
