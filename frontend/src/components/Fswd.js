import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Fswd = () => {
    const { courseID } = useParams();
    const [courseData, setCourseData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
   

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        city: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8001/api/courses/${courseID}`)
            .then(response => {
                setCourseData(response.data);
                
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                
            });
    }, [courseID]);

    const skillsArray = courseData.skills ? courseData.skills.split('||') : [];

    
 
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8001/api/courses/enroll', {
            fullname: formData.fullName,
            email: formData.email,
            contact: formData.contactNumber,
            city: formData.city,
            course_name: courseData.course_name
        })
            .then(response => {
                toast.success('Enrollment form successful!',{autoClose:1000});
                setFormData({
                    fullName: '',
                    email: '',
                    contactNumber: '',
                    city: ''
                });
                handleClose(); 
            })
            .catch(error => {
                console.error('Error during enrollment:', error);
            });
    };

    return (
        <section>
            <div>
                <div>
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
                        </div>

                        <div className='border border-2 my-[4rem] mx-[4rem] h-[38rem] border-black rounded-md p-[2rem] lg:max-w-[30rem] sticky top-[100px] bg-[#FCF8F3]'>
                            {/* Image */}
                            <div><img src={`http://localhost:8001/uploads/${courseData.banner_image}`} alt="Course Banner" className='pb-[2rem] hover:scale-110' /></div>
                            <div><button className='bg-cyan-400 px-[2rem] rounded-md' onClick={handleOpen}>Enroll Now &nbsp;&nbsp;&nbsp; ₹ {courseData.course_fee}</button></div>
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

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4'>
                        {/* Header Section */}
                        <div className='flex justify-between items-center mb-6'>
                            <h1 className='text-2xl font-semibold text-gray-800'>Enroll Now</h1>
                            <button
                                className='text-gray-600 hover:text-red-500 text-xl'
                                onClick={handleClose}
                            >
                                X
                            </button>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                                    <input
                                        type='text'
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder='Enter full name'
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder='Enter email'
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Contact Number</label>
                                    <input
                                        type='text'
                                        name='contactNumber'
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        placeholder='Enter contact number'
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>City</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder='Enter city'
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                </div>
                            </div>

                            <div className='mt-6'>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Fswd;
