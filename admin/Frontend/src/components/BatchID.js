import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const BatchID = () => {
  const { batchID } = useParams();
  const [students, setStudents] = useState([]); // Initialize as an array
  const [instructor, setinstructor] = useState([]);
  const [batchName, setBatchName] = useState(''); // Separate state for batch name

  useEffect(() => {
    axios.get(`http://localhost:8001/api/viewbatchdetails/${batchID}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data)
          setStudents(response.data);
          if (response.data.length > 0) {
            setBatchName(response.data[0].batchName); // Assuming all students have the same batch name
          }
        }
      })
      .catch(error => {
        console.error('Error fetching batch data:', error);
      });

      axios.get(`http://localhost:8001/api/viewinstructorbatchdetails/${batchID}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data)
          setinstructor(response.data);
          if (response.data.length > 0) {
            setBatchName(response.data[0].batchName); // Assuming all students have the same batch name
          }
        }
      })
      .catch(error => {
        console.error('Error fetching batch data:', error);
      });
  }, [batchID]);

  return (
    <section className="flex h-screen">
      <div className="App">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Batch Details</h2>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Batch:      {batchName}</h3>
              <table className="min-w-full bg-white border border-gray-300 mb-24">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone Number</th>
                    <th className="p-3 text-left">Enrollment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.studentID}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                    >
                      <td className="p-3">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.phoneNumber}</td>
                      <td className="p-3">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-3 text-center">No students found for this batch</td>
                    </tr>
                  )}
                </tbody>
              </table>


              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-3 text-left">Instructor Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone Number</th>
                    <th className="p-3 text-left">Hired Date</th>
                  </tr>
                </thead>
                <tbody>
                  {instructor.map((student, index) => (
                    <tr
                      key={student.studentID}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                    >
                      <td className="p-3">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.phoneNumber}</td>
                      <td className="p-3">{new Date(student.hireDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {instructor.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-3 text-center">No Instructor found for this batch</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BatchID;
