import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import Select from 'react-select'; // Import react-select
import { useHandleAuthError } from './ErrorAuth';

const Addinstobatch = () => {
    const [instructors, setInstructors] = useState([]);
    const [batches, setBatches] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null); // Use null for react-select
    const [selectedBatch, setSelectedBatch] = useState(null); // Use null for react-select
    const [error, setError] = useState('');
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `${token}`;

        // Fetch instructors
        axios.get('http://localhost:8001/api/viewinstructor')
            .then(response => {
                const instructorOptions = response.data.map(instructor => ({
                    value: instructor.instructorID,
                    label: `${instructor.firstName} ${instructor.lastName} --- ${instructor.email}`
                }));
                setInstructors(instructorOptions);
            })
            .catch(error => {
                try {
                    handleAuthError(error);
                } catch (err) {
                    console.log(err.message);
                }
            });

        // Fetch batches
        axios.get('http://localhost:8001/api/viewbatches')
            .then(response => {
                const batchOptions = response.data.map(batch => ({
                    value: batch.batchID,
                    label: batch.batchName
                }));
                setBatches(batchOptions);
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

        if (!selectedInstructor || !selectedBatch) {
            setError('Please select both an instructor and a batch');
            return;
        }

        const assignmentData = { instructorID: selectedInstructor.value, batchID: selectedBatch.value };

        axios.post('http://localhost:8001/api/addinstructortobatch', assignmentData)
            .then(response => {
                toast.success('Instructor assigned to batch successfully!', { autoClose: 1000 });
                setSelectedInstructor(null);
                setSelectedBatch(null);
                setError('');
            })
            .catch(error => {
                console.error('Error assigning instructor to batch:', error);
                toast.error('An error occurred while assigning instructor to batch');
            });
    };

    return (
        <section className="flex h-screen">
            <div className="App">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8 flex-1 overflow-auto">
                    <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 sm:p-8">
                        <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
                            <h2 className="text-2xl font-bold mb-4 text-center">Assign Instructor to Batch</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Select Instructor:</label>
                                    <Select
                                        options={instructors}
                                        value={selectedInstructor}
                                        onChange={setSelectedInstructor}
                                        placeholder="Select Instructor"
                                        isSearchable={true}
                                        className="w-full"
                                        maxMenuHeight={150} // Limit dropdown height and enable scroll
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Select Batch:</label>
                                    <Select
                                        options={batches}
                                        value={selectedBatch}
                                        onChange={setSelectedBatch}
                                        placeholder="Select Batch"
                                        isSearchable={true}
                                        className="w-full"
                                        maxMenuHeight={150} // Limit dropdown height and enable scroll
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    Assign Instructor
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addinstobatch;

