import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Batchdetails = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchID, setSelectedBatchID] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch batches to make the dropdown
    axios.get('http://localhost:8001/api/viewbatches')
      .then(response => setBatches(response.data))
      .catch(error => {
        console.error('Error fetching batches:', error);
        setError('Failed to load batches.');
      });
  }, []);

  const handleBatchChange = (e) => {
    const batchID = e.target.value;
    setSelectedBatchID(batchID);

    // Fetch students for the selected batch
    axios.get(`http://localhost:8001/api/viewbatchdeatils/${batchID}`)
      .then(response => setStudents(response.data))
      .catch(error => {
        console.error('Error fetching students:', error);
        setError('Failed to load students.');
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Batch Students</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Select Batch:</label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={selectedBatchID}
          onChange={handleBatchChange}
        >
          <option value="">Select Batch</option>
          {batches.map(batch => (
            <option key={batch.batchID} value={batch.batchID}>
              {batch.batchName}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {students.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Students in Batch</h2>
          <ul>
            {students.map(student => (
              <li key={student.studentID} className="mb-2">
                <p className="text-lg font-semibold">{student.firstName} {student.lastName}</p>
                <p className="text-gray-600">Email: {student.email}</p>
                <p className="text-gray-600">Phone: {student.phoneNumber}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Batchdetails;
