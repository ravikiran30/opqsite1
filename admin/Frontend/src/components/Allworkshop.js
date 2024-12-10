import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useHandleAuthError } from './ErrorAuth';
const Allworkshop = () => {
    const [workshops, setWorkshops] = useState([]);
    const navigate = useNavigate();
    const handleAuthError = useHandleAuthError();


    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `${token}`;
        // Fetch workshops including toggle state
        axios.get('http://localhost:8001/api/viewworkshop')
            .then(response => {
                setWorkshops(response.data);
            })
            .catch(error => {
                try {
                  handleAuthError(error);
                } catch (err) {
                  console.log(err.message);
                }
            });
    }, []);

    // // Delete workshop
    // const deleteWorkshop = (id) => {
    //     axios.delete(`http://localhost:8001/api/deleteworkshop/${id}`)
    //         .then(response => {
    //             console.log(response.data.message);
    //             setWorkshops(workshops.filter(workshop => workshop.workshopID !== id));
    //         })
    //         .catch(error => {
    //             console.error('Error deleting Workshop:', error);
    //         });
    // };

    // const handleView = (workshopID) => {
    //     navigate(`/workshop/${workshopID}`);
    // };

    //to update the status of courses
    const handleStatusChange = (id, status) => {
        axios.put(`http://localhost:8001/api/workshoptosite/${id}`, { status })
            .then(response => {
                setWorkshops(workshops.map(enquiry =>
                    enquiry.workshopID === id ? { ...enquiry, status } : enquiry
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

    return (
        <section className="flex h-screen">
            <div className="App">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-auto">
                    <div className="p-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Workshops Table</h2>

                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-3 text-left">Workshop ID</th>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Author</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Time</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Cost</th>
                                    {/* <th className="p-3 text-left">Actions</th> */}
                                    <th className="p-3 text-left">Add to Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workshops.map((workshop, index) => (
                                    <tr
                                        key={workshop.workshopID}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                                    >
                                        <td className="p-3">{workshop.workshopID}</td>
                                        <td className="p-3">{workshop.title}</td>
                                        <td className="p-3">{workshop.author}</td>
                                        <td className="p-3">{new Date(workshop.date).toLocaleDateString()}</td>
                                        <td className="p-3">{workshop.time}</td>
                                        <td className="p-3">{workshop.descr}</td>
                                        <td className="p-3">₹{workshop.cost}</td>
                                        {/* <td className="p-3 flex space-x-2">
                                            <button className="text-blue-500" onClick={() => handleView(workshop.workshopID)} data-tooltip-id="viewmore" data-tooltip-content="View More">
                                                <FaEye />
                                                <Tooltip id="viewmore" place="left" effect="solid" />
                                            </button>
                                            <button className="text-red-500" onClick={() => deleteWorkshop(workshop.workshopID)} data-tooltip-id="delete" data-tooltip-content="Delete">
                                                <FaTrash />
                                                <Tooltip id="delete" place="right" effect="solid" />
                                            </button>
                                        </td> */}

                                        <td className="p-3">
                                        <input
                                                        type="checkbox"
                                                        className="h-5 w-5 text-green-600  rounded text-green-600 focus:ring-green-600"
                                                        checked={workshop.status === 'done'}
                                                        onChange={(e) => handleStatusChange(workshop.workshopID, e.target.checked ? 'done' : 'pending')}
                                                    />
                                            {/* <span
                                                className={`ml-3 text-sm font-medium ${workshop.toggle ? 'text-green-500' : 'text-red-500'}`}
                                            >
                                                {workshop.toggle ? 'ON' : 'OFF'}
                                            </span> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Allworkshop;
