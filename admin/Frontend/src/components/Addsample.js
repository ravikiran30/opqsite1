// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import { toast } from 'react-toastify';
// import { useHandleAuthError } from './ErrorAuth';


// const Addinstobatch = () => {
//     const [instructor, setInstructor] = useState([]);
//     const [batches, setBatches] = useState([]);
//     const [selectedInstructor, setSelectedInstructor] = useState('');
//     const [selectedBatch, setSelectedBatch] = useState('');
//     const [error, setError] = useState('');
//     const handleAuthError = useHandleAuthError();

//     useEffect(() => {
//         // instructors to make the dropdown
//         const token = localStorage.getItem('token'); 
//         axios.defaults.headers.common['Authorization'] = `${token}`;
//         axios.get('http://localhost:8001/api/viewinstructor') 
//             .then(response => {
//                 setInstructor(response.data);
//             })
//             .catch(error => {
//                 try {
//                   handleAuthError(error);
//                 } catch (err) {
//                   console.log(err.message);
//                 }
//             });

//         //  batches to make the dropdown
//         axios.get('http://localhost:8001/api/viewbatches') 
//             .then(response => {
//                 setBatches(response.data);
//             })
//             .catch(error => {
//                 try {
//                   handleAuthError(error);
//                 } catch (err) {
//                   console.log(err.message);
//                 }
//             });
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const assignmentData = { instructorID: selectedInstructor, batchID: selectedBatch };

//         axios.post('http://localhost:8001/api/addinstructortobatch', assignmentData)
//             .then(response => {
//                 toast.success('instructor assigned to batch successfully!', { autoClose: 1000 });

//                 setSelectedInstructor('');
//                 setSelectedBatch('');
//                 setError('');
//             })
//             .catch(error => {
//                 console.error('Error assigning instructor to batch:', error);
//                 toast.error('An error occurred while assigning instructor to batch');
//             });
//     };

//     return (
//         <section className="flex h-screen">
//             <div className="App">
//                 <Sidebar />
//             </div>
//             <div className="flex-1 flex flex-col">
//                 <Navbar />
//                 <div className="p-8 flex-1 overflow-auto">
//                     <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 sm:p-8">
//                         <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
//                             <h2 className="text-2xl font-bold mb-4 text-center">Assign instructor to Batch</h2>
//                             {error && <p className="text-red-500 mb-4">{error}</p>}
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700">Select instructor:</label>
//                                     <select
//                                         className="w-full px-3 py-2 border rounded"
//                                         value={selectedInstructor}
//                                         onChange={(e) => setSelectedInstructor(e.target.value)}
//                                         required
//                                     >
//                                         <option value="">Select Instructor</option>
//                                         {instructor.map(instructor => (
//                                             <option key={instructor.instructorID} value={instructor.instructorID}>
//                                                 {instructor.firstName} {instructor.lastName} --- {instructor.email}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700">Select Batch:</label>
//                                     <select
//                                         className="w-full px-3 py-2 border rounded"
//                                         value={selectedBatch}
//                                         onChange={(e) => setSelectedBatch(e.target.value)}
//                                         required
//                                     >
//                                         <option value="">Select Batch</option>
//                                         {batches.map(batch => (
//                                             <option key={batch.batchID} value={batch.batchID}>
//                                                 {batch.batchName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                                 >
//                                     Assign instructor
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Addinstobatch;
