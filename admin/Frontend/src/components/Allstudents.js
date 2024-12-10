import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'
import * as XLSX from 'xlsx';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useHandleAuthError } from './ErrorAuth'; 


const Allstudents = () => {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `${token}`;
        axios.get('http://localhost:8001/api/viewstudent')
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                try {
                    handleAuthError(error);
                } catch (err) {
                    console.log(err.message);
                }
            })

    }, []);

    // Delete record
    const deleteStudent = (id) => {
        axios.delete(`http://localhost:8001/api/deletestudent/${id}`)
            .then(response => {
                console.log(response.data.message);
                setData(data.filter(student => student.studentID !== id));
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };



    // View student details
    const handleView = (studentID) => {
        navigate(`/students/${studentID}`);
    };

    // Filter data on search query
    const filteredData = data.filter(student =>
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <div className='flex-1 overflow-auto'>
                    <div className="p-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Student Table</h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <table className="min-w-full bg-white border border-gray-300 ">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-3 text-left">Student ID</th>
                                    <th className="p-3 text-left">First Name</th>
                                    <th className="p-3 text-left">Last Name</th>
                                    <th className="p-3 text-left">Email</th>

                                    <th className="p-3 text-left">Phone Number</th>
                                    <th className="p-3 text-left">Date of Birth</th>

                                    <th className="p-3 text-left">Enrollment Date</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ?
                                    filteredData.map((student, index) => (
                                        <tr
                                            key={student.studentID}
                                            className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                                        >
                                            <td className="p-3">{student.studentID}</td>
                                            <td className="p-3">{student.firstName}</td>
                                            <td className="p-3">{student.lastName}</td>
                                            <td className="p-3">{student.email}</td>

                                            <td className="p-3">{student.phoneNumber}</td>
                                            <td className="p-3">{new Date(student.dateOfBirth).toLocaleDateString()}</td>

                                            <td className="p-3">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                                            <td className="p-3 flex space-x-2">
                                                <button className="text-blue-500" onClick={() => handleView(student.studentID)} data-tooltip-id="viewmore" data-tooltip-content="View More">
                                                    <FaEye />
                                                    <Tooltip id="viewmore" place="left" effect="solid" />
                                                </button>

                                                <button className="text-red-500" onClick={() => deleteStudent(student.studentID)} data-tooltip-id="delete" data-tooltip-content="Delete ">
                                                    <FaTrash />
                                                    <Tooltip id="delete" place="right" effect="solid" />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <p className='text-xl text-center'>No Data Found</p>}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => exportToExcel(data, 'Student_Lists')}
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

export default Allstudents;
