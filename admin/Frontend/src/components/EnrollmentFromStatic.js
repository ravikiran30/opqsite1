import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const EnrollmentFromStatic = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        axios.get('http://localhost:8001/api/viewEnrollments')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortConfig({ key, direction });
        setData(sortedData);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                return <FaSortUp />;
            }
            if (sortConfig.direction === 'descending') {
                return <FaSortDown />;
            }
        }
        return <FaSort />;
    };


    //to update the status of contact
    const handleStatusChange = (id, status) => {
        axios.put(`http://localhost:8001/api/updateenrollstatus/${id}`, { status })
            .then(response => {
                setData(data.map(enroll =>
                    enroll.staticEnroll_id === id ? { ...enroll, status } : enroll
                ));
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };
 
    // Delete record
    const deleteRecord = (id) => {
        axios.delete(`http://localhost:8001/api/deleteenroll/${id}`)
            .then(response => {
                console.log(response.data.message);
                setData(data.filter(enroll => enroll.staticEnroll_id !== id));
            })
            .catch(error => {
                console.error('Error deleting record:', error);
            });
    };

    return (
        <section className='flex'>
            <div className='flex-none'>
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className='flex-1 overflow-auto'>
                    <div className='flex justify-center grow bg-gray-100'>
                        <div className="p-8 bg-gray-100">
                            <h1 className="text-3xl font-bold text-center mb-6">Enrollment From static Website</h1>
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-800 text-white">
                                            <th className="py-2 px-4 text-left ">
                                                ID
                                            </th>
                                            <th className="py-2 px-4 text-left ">
                                                Name
                                            </th>
                                            <th className="py-2 px-4 text-left ">
                                                Email
                                            </th>
                                            <th className="py-2 px-4 text-left ">
                                                Phone Number
                                            </th>
                                            <th className="py-2 px-4 text-left " >
                                                City
                                            </th>
                                            <th className="py-2 px-4 text-left " onClick={() => sortData('course_name')}>
                                               Course Name {getSortIcon('course_name')}
                                            </th>
                                            <th className="py-2 px-4 text-left " >
                                                Enrollment Date 
                                            </th>
                                            
                                            <th className="py-2 px-4 text-left " onClick={() => sortData('status')}>Status
                                                {getSortIcon('status')}
                                            </th>
                                            <th className="py-2 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((enroll, index) => (
                                            <tr key={enroll.staticEnroll_id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.staticEnroll_id}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.fullname}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.email}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.contact}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.city}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{enroll.course_name}</td>
                                                <td className="py-2 px-4 text-sm text-gray-800">{new Date(enroll.enrollment_date).toLocaleDateString()}</td>
                                               
                                                <td className="py-2 px-4 text-sm text-gray-800">
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 text-green-600  rounded text-green-600 focus:ring-green-600"
                                                        checked={enroll.status === 'done'}
                                                        onChange={(e) => handleStatusChange(enroll.staticEnroll_id, e.target.checked ? 'done' : 'pending')}
                                                    />
                                                </td>
                                                <td className="p-3 flex space-x-2">


                                                    <button className="text-red-500" onClick={() => deleteRecord(enroll.staticEnroll_id)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnrollmentFromStatic;
