import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useHandleAuthError } from './ErrorAuth';

const Allinstructor = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `${token}`;
        axios.get('http://localhost:8001/api/viewinstructor')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                try {
                    handleAuthError(error);
                } catch (err) {
                    console.log(err.message);
                }
            });
    }, []);

    // Delete record
    const deleteInstructor = (id) => {
        axios.delete(`http://localhost:8001/api/deleteinstructor/${id}`)
            .then(response => {
                console.log(response.data.message);
                setData(data.filter(instructor => instructor.instructorID !== id));
            })
            .catch(error => {
                console.error('Error deleting instructor:', error);
            });
    };

    // View instructor details
    const handleView = (instructorID) => {
        navigate(`/instructors/${instructorID}`);
    };

    // Filter data based on search query
    const filteredData = data.filter(instructor =>
        instructor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className="overflow-x-auto w-full p-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Instructor Table</h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-3 text-left">Instructor ID</th>
                                    <th className="p-3 text-left">First Name</th>
                                    <th className="p-3 text-left">Last Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone Number</th>
                                    <th className="p-3 text-left">Date of Birth</th>
                                    <th className="p-3 text-left">Address</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">State</th>
                                    <th className="p-3 text-left">Hire Date</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((instructor, index) => (
                                    <tr
                                        key={instructor.instructorID}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                                    >
                                        <td className="p-3">{instructor.instructorID}</td>
                                        <td className="p-3">{instructor.firstName}</td>
                                        <td className="p-3">{instructor.lastName}</td>
                                        <td className="p-3">{instructor.email}</td>
                                        <td className="p-3">{instructor.phoneNumber}</td>
                                        <td className="p-3">{new Date(instructor.dateOfBirth).toLocaleDateString()}</td>
                                        <td className="p-3">{instructor.address}</td>
                                        <td className="p-3">{instructor.city}</td>
                                        <td className="p-3">{instructor.state}</td>
                                        <td className="p-3">{new Date(instructor.hireDate).toLocaleDateString()}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-blue-500" onClick={() => handleView(instructor.instructorID)} data-tooltip-id="viewmore" data-tooltip-content="View More">
                                                <FaEye />
                                                <Tooltip id="viewmore" place="left" effect="solid" />
                                            </button>

                                            <button className="text-red-500" onClick={() => deleteInstructor(instructor.instructorID)} data-tooltip-id="delete" data-tooltip-content="Delete ">
                                                <FaTrash />
                                                <Tooltip id="delete" place="right" effect="solid" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => exportToExcel(data, 'Instructor_Lists')}
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

export default Allinstructor;
