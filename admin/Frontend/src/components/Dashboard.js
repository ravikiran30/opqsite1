import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHandleAuthError } from './ErrorAuth';

function Dashboard() {
  const [studentCount, setStudentCount] = useState(null);
  const [instructorCount, setInstructorCount] = useState(null);
  const [batchCount, setBatchCount] = useState(null);
  const [coursesCount, setCoursesCount] = useState(null);
  const [enquiryCount, setEnquiryCount] = useState(null);
  const [workshopCount, setWorkshopCount] = useState(null);
  const [staticCount, setStaticCount] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleAuthError = useHandleAuthError();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    axios.defaults.headers.common['Authorization'] = `${token}`;

    axios.get('http://localhost:8001/api/countDashboard')
      .then(response => {
        setStudentCount(response.data[0].row_count);
        console.log(response.data[0].row_count)
        setInstructorCount(response.data[1].row_count);
        setCoursesCount(response.data[2].row_count);
        setEnquiryCount(response.data[4].row_count);
        setWorkshopCount(response.data[5].row_count);
        setBatchCount(response.data[3].row_count);
        setStaticCount(response.data[6].row_count);
        console.log(response.data)
      })
      .catch(error => {
        try {
          handleAuthError(error);
        } catch (err) {
          console.log(err.message);
        }
      });
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="flex h-screen">
      <div className="App">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 flex-1 overflow-auto">
          <section className="p-4 sm:p-8 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => handleCardClick('/viewstudent')}
                  className="bg-blue-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Total Students</h3>
                  <p className="text-3xl font-bold text-blue-900">{studentCount !== null ? studentCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/viewinstructor')}
                  className="bg-green-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Total Instructors</h3>
                  <p className="text-3xl font-bold text-green-900">{instructorCount !== null ? instructorCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/viewcourse')}
                  className="bg-yellow-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-yellow-800">Total Courses</h3>
                  <p className="text-3xl font-bold text-yellow-900">{coursesCount !== null ? coursesCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/dashboard/enquiry')}
                  className="bg-red-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-red-800">Total Enquiries</h3>
                  <p className="text-3xl font-bold text-red-900">{enquiryCount !== null ? enquiryCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/viewbatches')}
                  className="bg-green-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Total Batches</h3>
                  <p className="text-3xl font-bold text-green-900">{batchCount !== null ? batchCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/viewworkshop')}
                  className="bg-yellow-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-yellow-800">Total Workshop</h3>
                  <p className="text-3xl font-bold text-yellow-900">{workshopCount !== null ? workshopCount : 'Loading...'}</p>
                </div>
                <div
                  onClick={() => handleCardClick('/enrollmentsfromstatic')}
                  className="bg-red-100 shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-4 text-red-800"> Enrollment From website</h3>
                  <p className="text-3xl font-bold text-red-900">{staticCount !== null ? staticCount : 'Loading...'}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
