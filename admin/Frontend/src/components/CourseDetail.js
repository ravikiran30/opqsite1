
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseID } = useParams();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:8001/api/course/${courseID}`)
      .then(response => {
        console.log(response.data);
        setCourseData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
  }, [courseID]);
  if (loading) {
    return <div>Loading...</div>;
  }
  const skillsArray = courseData.skills.split('||');
  return (
    <section className="flex h-screen">
      <div className="App">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col shadow-lg">
        <Navbar />
        <div className="flex-1 overflow-auto">

          <div className='bg-blue-950 text-zinc-50 px-[4rem] py-[2rem]'>
            <div className='lg:max-w-[80rem]'>
              <div><h4>Home / Courses / {courseData.course_name}</h4></div>
              <div><h1 className='text-[2rem]'>{courseData.course_name}</h1></div>
              <div><h4 className='font-bold'>25 learners</h4></div>
              <div><p>{courseData.short_description}</p></div>
            </div>
          </div>

          <div className='lg:flex flex-row'>
            <div>
              <div className='px-[4rem] py-[2rem]'>
                <div className='lg:max-w-[55rem]'>
                  <div><h4 className='text-[1.75rem]'>Course Overview</h4></div>
                  <div><p className='py-[1rem]'>{courseData.overview}</p></div>
                  <div className='pb-[3rem]'><p>{courseData.full_description}</p></div>
                </div>

                <div className='lg:max-w-[55rem]'>
                  <div><h4 className='text-[1.75rem]'>Course Requirements</h4></div>
                  <div><p className='py-[1rem]'>{courseData.course_requirements}</p></div>
                </div>

                <div className='border border-2 border-black rounded-md p-[2rem] lg:max-w-[55rem]'>
                  <div><h1 className='text-[1.75rem] pb-[2rem]'>Skills you Learn</h1></div>
                  <div className='flex flex-row flex-wrap gap-4'>
                    {skillsArray.map((skill, index) => (
                      <div key={index}><p className='bg-slate-400 px-[1.5rem] rounded-md'>{skill}</p></div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            <div className='border border-2 my-[4rem] mx-[4rem] h-[38rem] border-black rounded-md p-[2rem] lg:max-w-[30rem] sticky top-[80px] bg-[#FCF8F3]'>
              <div><img src={`http://localhost:8001/uploads/${courseData.banner_image}`}
                alt="Course Banner" className='pb-[2rem] hover:scale-110' /></div>
              <div><button className='bg-cyan-400 px-[2rem] rounded-md'>Enroll Now &nbsp;&nbsp;&nbsp; ₹ {courseData.course_fee}</button></div>
              <div className='flex flex-row pt-[2rem]'>
                <div><img src='https://www.opqbootcamp.com/assets/img/feature-icons/icon-1.png' className='object-cover h-10 w-10 ' alt='' /></div>
                <div><p className='p-[1rem]'>Live virtual classes taught by industry experts</p></div>
              </div>
              <div className='flex flex-row '>
                <div><img src='https://www.opqbootcamp.com/assets/img/feature-icons/icon-1.png' className='object-cover h-10 w-10 ' alt='' /></div>
                <div><p className='p-[1rem]'>Cohort based learning with peer-to-peer interaction</p></div>
              </div>
              <div className='flex flex-row '>
                <div><img src='https://www.opqbootcamp.com/assets/img/feature-icons/icon-1.png' className='object-cover h-10 w-10 ' alt='' /></div>
                <div><p className='p-[1rem]'>Live virtual classes taught by industry experts</p></div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
