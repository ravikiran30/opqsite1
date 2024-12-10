
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React ,{ Suspense} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar  from './components/Navbar';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Aboutus from './components/Aboutus';
import Scroll from './components/Scroll';
import Fswd from './components/Fswd';
import Login from './components/Login'
import Faqs from './components/Fqas';
import Workshop from './components/Workshop';
import Wsaws from './components/Wsaws'; 
import Contactus from './components/Contactus';
import Dashboard from './components/Dashboard';
import Enroll from './components/Enroll';


const LazyHome =React.lazy(()=> import ("./components/Home"))

function App() {
  return (
    <div className="App">
   
     <BrowserRouter>
     <ToastContainer /> 
        <Navbar />
        
        
        <Routes>
          <Route path='/' element={<> <Suspense fallback={<div><p className='text-[200px] w-screen h-screen'>Loading........</p></div>}><LazyHome/></Suspense> </> } />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/blog' element={<Blog />} />
          {/* <Route path='/course/fswd' element={<Fswd/>} />
          <Route path='/course/aws' element={<Fswd/>} /> */}
          <Route path='/courses/:courseID' element={<Fswd/>} />
          <Route path='/contact/faqs' element={<Faqs/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Workshop' element={<Workshop/>} />
          <Route path='/workshop/aws' element={<Wsaws/>} />
          <Route path='/Contact/contactus' element={<Contactus/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/enroll' element={<Enroll/>}/>
          
        </Routes>
        <Scroll/>
        <Footer/>
       
      </BrowserRouter>

 

    </div>
  );
}

export default App;
