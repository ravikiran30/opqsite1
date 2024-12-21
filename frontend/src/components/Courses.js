import React, { useState,useEffect} from 'react';
import axios from 'axios';
import img1 from '../images/courses/Devops.jpg';
import img2 from '../images/courses/OIP.jpg';
import img3 from '../images/courses/FSWD.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    
    // const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const courses=[
        {
            "courseID": 1,
            "category": "Technology",
            "course_name": "Devops",
            "course_url": "https://google.com",
            "course_fee": "966.00",
            "skills": "AWS|| GIT||DOCKER||CI/CD",
            "short_description": "DevOps bootcamp teaches you about AWS cloud, deployments, CI/CD pipeline and Git.",
            "full_description": "~Define and discuss the OPQ Tech DevOps Bootcamp's key concepts and principles.\r\n~Make a list of and explain the business advantages of continuous delivery.\r\n~Describe the process of Service Delivery.\r\n~Demonstrate your understanding of the concepts of test automation, infrastructure automation, and build and deployment automation.\r\n~Understand the relationship between OPQ Tech DevOps and Lean and Agile methodologies.\r\n~Summarize case studies of IT organsations that are making the transformation to Adaptive IT and DevOps models.\r\n~Learn about the most commonly used and popular DevOps tools.\r\n~Discuss the critical success factors for implementing DevOps.",
            "overview": "Overview of the OPQ Tech DevOps Bootcamp tools and their importance.\r\n\r\nContinuous Integration & Continuous Deployment / Delivery Overview.\r\n\r\nHow to Choose the Best Deployment, Testing, Management, and Orchestration Methods.\r\n\r\nSelect the appropriate modules and optimize the current deployment.\r\n\r\nTools, Framework, and Mindset Challenges in DevOps Implementation.",
            "what_will_you_learn": "The OPQ Tech DevOps Bootcamp Program is designed to provide you with the opportunity to learn the latest technologies in the IT industry. The course is designed to help you become a DevOps Engineer while also providing you with the opportunity to work alongside talented professionals. As a result, you may be able to join an international working environment anywhere in the world.\r\n\r\nThe course will be led by experienced and practitioner Software Development Academy trainers. Trainers will prepare you to meet the requirements of an OPQ Tech DevOps Engineer providing Industry Solutions. You will have the opportunity to join a thriving and promising IT sector if you take online classes. You will be given a new set of unique skills that will help you.\r\n\r\n",
            "course_requirements": "The OPQ Tech DevOps Bootcamp will teach you how to master the art and science of optimizing the development and operational activities of your entire team. This DevOps course will show you how to use configuration management tools such as Puppet, Salt Stack, and Ansible to gain experience in continuous deployment.",
            "who_is_this_course_for": "Anyone who needs a thorough understanding of OPQ Tech DevOps principles, such as project and business managers, IT quality assurance, testing, and service management professionals, and anyone involved in the development, operation, and delivery of IT services.\r\n\r\nIf you are a beginner or a seasoned IT professional who is constantly striving for self-improvement\r\n\r\nDo you want to learn about the most recent technological standards?\r\n\r\nIf you have decided to change your career path,\r\n\r\nIf you want to work for one of the country's largest IT firms,",
            "course_image": "d9556b5c4b3421dc63c89fb338e5fd51",
            "banner_image": "0701d9f83dd75b35e48f6d3e23e8d646",
            "syllabus_pdf": "a8aee6e8ee5377612f0430ee00180079",
            "status": "done"
        },
        {
            "courseID": 2,
            "category": "Technology",
            "course_name": "Full Stack Developer Course",
            "course_url": "https://google.com",
            "course_fee": "2998.00",
            "skills": "SQL||JAVASCRIPT||HTML||CSS||REACT JS||NODE JS",
            "short_description": "Full Stack Developer Course helps you to master in the React JS, Express, Node.js, Mongo DB, and Python",
            "full_description": "This module at OPQ Tech  will guide students through the process of building and developing powerful modern web applications that serve as the foundation for the apps, websites, and systems that organisations use on a daily basis. The training begins by teaching you how to create web apps with eye-catching designs and how to use dynamic HTML effects with a few clever tags. Each module includes several technologies to help you acquire more experience and study new technologies and frameworks on the frontend (HMTL5, CSS3, Bootstrap, JavaScript, Angular8) as well as the backend (NodeJS framework, Express JS framework, and Database) (NoSQL-MongoDB). Students will obtain hands-on experience in practical applications with several projects in addition to theory. Join this course with OPQ Tech, to improve your chances of becoming a professional Full Stack Web Developer",
            "overview": "OPQ Tech  helps you learn everything you need to know to advance your tech profession.\r\n\r\nWeb developers that can work on all aspects of the website are in high demand. Because the market is short on full-stack developers, companies are looking for people who can manage both the backend and the front end. A full-stack developer's remuneration is on the higher end of the spectrum because it is a highly sought-after profession. By enrolling in this programme at OPQ Tech, you can advance your career. A full-stack web developer is a software specialist who is proficient in both front end and back end programming, as well as Angular and NodeJS in particular. Learn the essentials of HTML 5 as well as the fundamentals of JavaScript and TypeScript. NodeJS and Angular advanced concepts, as well as MongoDB concepts Learn how to debug programmes and acquire a certificate at the completion of this course.",
            "what_will_you_learn": "A full-stack web developer is a software specialist who is proficient in both front end and back end programming, as well as Angular and NodeJS in particular. Learn the essentials of HTML 5 as well as the fundamentals of JavaScript and TypeScript. NodeJS and Angular advanced concepts, as well as MongoDB concepts Learn how to debug programmes and acquire a certificate at the completion of this course.\r\n",
            "course_requirements": "Full Stack Developer is a comprehensive training program designed to equip participants with the skills and knowledge required to build end-to-end web applications. This course is intended for individuals who want to learn the latest web development technologies and frameworks. \r\n\r\nThe course will cover a range of topics, including:\r\n\r\nBasics of programming language \r\n1.Front-end development using HTML, CSS, JavaScript, and popular front-end frameworks such as React, Angular, or Vue.js\r\n2.Back-end development using popular programming languages such as Node.js, Python, Ruby on Rails, or PHP\r\n3.Databases and data modeling with SQL and NoSQL databases such as MySQL, MongoDB, or Postgres\r\nRESTful API design and development\r\n4.Deployment and hosting of web applications on cloud platforms such as AWS, Azure, or GCP\r\n5.Agile development methodologies, Git, and version control\r\n6.User experience design and testing, and accessibility considerations\r\n7.On Job Training - In Agile model, develop a realtime project using MERN stack. \r\nThroughout the course, participants will work on hands-on exercises, assignments, Q&A sessions, mini and major projects to apply their learning in real-world scenarios. By the end of the course, participants will have an in-depth understanding of full-stack development principles and best practices, as well as the practical skills needed to build and deploy modern web applications.",
            "who_is_this_course_for": "~Provide regular assignments to understand and solve real-time scenarios\r\n~Free Webinars in Real Time\r\n~Question and Answer sessions for enhancing skills\r\n~Mock Interviews and Quizzes are available indefinitely\r\n~Access to the course material and videos for the rest of your life\r\n~Experiential Learning in Real-World Projects\r\n~Offline Job Interviews\r\n~Job Opportunities in Full Stack Web Development.",
            "course_image": "ffb2a51d2fe5d1e27d1b06b7ff3583e8",
            "banner_image": "fa493e6988cef33b15a598925675ae77",
            "syllabus_pdf": "63de76319915d26e9edcf7aa75527215",
            "status": "done"
        }
    ]

    // useEffect(() => {
    //     axios.get('http://localhost:8001/api/courses')
    //         .then(response => {
    //             console.log(response.data)
    //             setCourses(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    // const handleView = (courseID) => {
    //     navigate(`/courses/${courseID}`);
    // };


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
                                   
                                    className="text-blue-500 hover:text-blue-700 font-semibold" 
                                >
                                    {/* onClick{() => handleView(course.courseID)} */}
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
