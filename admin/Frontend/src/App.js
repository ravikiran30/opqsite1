import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

import Enquiry from './components/Enquiry';
import Addstudent from './components/Addstudent';
import Allstudents from './components/Allstudents';
import Addcourses from './components/Addcourses';
import Viewcourses from './components/Viewcourses';
import Viewstudent from './components/Viewstudent';
import Addinstructor from './components/Addinstructor';
import Allinstructor from './components/Allinstructor';
import StudentDetail from './components/StudentDetail';
import Addbatches from './components/Addbatches';
import CourseDetail from './components/CourseDetail';
import AllCourses from './components/Allcourse';
import InstructorDetails from './components/InstructorDetail';
import Allbatches from './components/Allbatches';
import Addstutobatch from './components/Addstutobatch';
import Batchdetails from './components/Batchdetails';
import BatchID from './components/BatchID';
import Addinstobatch from './components/Addinstobatch';
import Addworkshop from './components/Addworkshop';
import Allworkshop from './components/Allworkshop';
import AddAdmin from './components/AddAdmin';
import EnrollmentFromStatic from './components/EnrollmentFromStatic';



const App = () => {


  return (
    <Router>
      <ToastContainer
        autoClose={3000}  // Set default autoClose time to 3 seconds (3000 ms)
        position="top-right"
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/dashboard/enquiry' element={ <Enquiry/>} />
        <Route path='/dashboard/addadmin' element={ <AddAdmin/>} />

        <Route path='/addstudent' element={ <Addstudent/>} />
        <Route path='/viewstudent' element={ <Allstudents/>} />
        <Route path="/students/:studentID" element={<StudentDetail/>} />

        <Route path='/addcourse' element={<Addcourses/>}/>
        <Route path='/viewcourse' element={<AllCourses/>} />
        <Route path='/course/:courseID' element={<CourseDetail/>}/>

        <Route path='/addinstructor' element={<Addinstructor/>}/>
        <Route path='/viewinstructor' element={<Allinstructor/>}/>
        <Route path="/instructors/:instructorID" element={<InstructorDetails/>} />
        <Route path='/addinstructortobatch' element={<Addinstobatch/>}/>
        
        <Route path='/addbatches' element={<Addbatches/>}/>
        <Route path='/viewbatches' element={<Allbatches/>}/>

        <Route path='/addworkshop' element={<Addworkshop/>}/>
        <Route path='/viewworkshop' element={<Allworkshop/>}/>
        <Route path='/enrollmentsfromstatic'element={<EnrollmentFromStatic/>} />
       

        <Route path='/addstudenttobatch' element={<Addstutobatch/>}/>
        <Route path='/viewbatchdetails/:batchID' element={<BatchID/>}/>
      </Routes>
    </Router>
  );
};

export default App;
