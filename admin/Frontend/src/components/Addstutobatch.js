import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import Select from 'react-select'; // Import react-select
import { useHandleAuthError } from './ErrorAuth';

const Addstutobatch = () => {
    const [students, setStudents] = useState([]);
    const [batches, setBatches] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // Using null for react-select
    const [selectedBatch, setSelectedBatch] = useState(null); // Using null for react-select
    const [error, setError] = useState('');
    const handleAuthError = useHandleAuthError();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `${token}`;
        
        // Fetch students to populate the dropdown
        axios.get('http://localhost:8001/api/viewstudent') 
            .then(response => {
                const studentOptions = response.data.map(student => ({
                    value: student.studentID,
                    label: `${student.firstName} ${student.lastName} --- ${student.email}`
                }));
                setStudents(studentOptions);
            })
            .catch(error => {
                try {
                    handleAuthError(error);
                } catch (err) {
                    console.log(err.message);
                }
            });

        // Fetch batches to populate the dropdown
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

        if (!selectedStudent || !selectedBatch) {
            setError('Please select both a student and a batch');
            return;
        }

        const assignmentData = { studentID: selectedStudent.value, batchID: selectedBatch.value };

        axios.post('http://localhost:8001/api/addstudenttobatch', assignmentData)
            .then(response => {
                toast.success('Student assigned to batch successfully!', { autoClose: 1000 });
                setSelectedStudent(null);
                setSelectedBatch(null);
                setError('');
            })
            .catch(error => {
                console.error('Error assigning student to batch:', error);
                toast.error('Student is already enrolled to this batch ');
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
                            <h2 className="text-2xl font-bold mb-4 text-center">Assign Student to Batch</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Select Student:</label>
                                    <Select
                                        options={students}
                                        value={selectedStudent}
                                        onChange={setSelectedStudent}
                                        placeholder="Select Student"
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
                                    Assign Student
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addstutobatch;
