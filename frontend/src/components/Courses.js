import React, { useState,useEffect} from 'react';
import axios from 'axios';
import img1 from '../images/courses/Devops.jpg';
import img2 from '../images/courses/OIP.jpg';
import img3 from '../images/courses/FSWD.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8001/api/courses')
            .then(response => {
                console.log(response.data)
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleView = (courseID) => {
        navigate(`/courses/${courseID}`);
    };


    return (
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Courses</h2>
                <p className="text-lg text-gray-600 mb-12">
                    Explore our wide range of courses designed to help you achieve your career goals with hands-on experience.
                </p>
                <div className="flex flex-col gap-8">
                    {courses.map((course, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={`http://localhost:8001/uploads/${course.course_image}`}
                                alt={course.course_name}
                                className="w-full md:w-1/3 h-48 object-cover rounded-lg md:rounded-none md:mr-6"
                            />
                            <div className="mt-4 md:mt-0 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{course.course_name}</h3>
                                <p className="text-gray-600 mb-4">{course.short_description}</p>
                                <button
                                   
                                    className="text-blue-500 hover:text-blue-700 font-semibold" onClick={() => handleView(course.courseID)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
