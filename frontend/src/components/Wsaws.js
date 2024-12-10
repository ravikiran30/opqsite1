
import React, { useState } from 'react'
import img12 from "../images/blog/420147_1000113590.jpg"

const Wsaws = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <section>
            <div>

                <div>
                    <div className='bg-blue-950 text-zinc-50 px-[4rem] py-[2rem]'>
                        <div className='lg:max-w-[80rem]'>
                            <div><h4>Home  /  Workshop /  AWS Webinar </h4></div>
                            <div><h1 className='text-[2rem]'>AWS Webinar</h1></div>
                            <div><h4 className='font-bold'>Starts On : 2023-08-02 "7:00 AM  -  9:00 AM"</h4></div>
                            <div><p>Agenda -- Introductionto cloud technology and AWS</p></div>
                        </div>
                    </div>

                    <div className='lg:flex flex-row'>

                        <div >
                            <div className='px-[4rem] py-[2rem]'>
                                <div className='lg:max-w-[55rem]'>
                                    <div><h4 className='text-[1.75rem]'>Workshop Overview</h4></div>
                                    <div><p className='py-[1rem]'>OPQ Tech  helps you learn everything you need to know to advance your tech profession.</p></div>
                                    <div className='pb-[3rem]'><p>Web developers that can work on all aspects of the website are in high demand.
                                        Because the market is short on full-stack developers, companies are looking for people who can manage both the
                                        backend and the front end. A full-stack developer's remuneration is on the higher end of the spectrum because it
                                        is a highly sought-after profession. By enrolling in this programme at OPQ Tech, you can advance your career.
                                        A full-stack web developer is a software specialist who is proficient in both front end and back end programming,
                                        as well as Angular and NodeJS in particular. Learn the essentials of HTML 5 as well as the fundamentals of JavaScript
                                        and TypeScript. NodeJS and Angular advanced concepts, as well as MongoDB concepts Learn how to debug programmes and
                                        acquire a certificate at the completion of this course.
                                    </p></div>
                                </div>

                                <div className='lg:max-w-[55rem]'>
                                    <div><h4 className='text-[1.75rem]'> Workshop Details</h4></div>
                                    <div><p className='py-[1rem]'>Full Stack Developer is a comprehensive training program designed to equip participants with the skills and knowledge
                                        required to build end-to-end web applications. This course is intended for individuals who want to learn the latest web development technologies
                                        and frameworks. </p></div>
                                    <div><p className='py-[1rem]'>The course will cover a range of topics, including: </p></div>
                                    <div className='pb-[3rem] pl-[1rem]'><p>1.Basics of programming language.<br />
                                        2.Front-end development using HTML, CSS, JavaScript, and popular front-end frameworks such as React, Angular, or Vue.js
                                        <br />3.Back-end development using popular programming languages such as Node.js, Python, Ruby on Rails, or PHP
                                        <br />4.Databases and data modeling with SQL and NoSQL databases such as MySQL, MongoDB, or Postgres
                                        <br />5.RESTful API design and development
                                        <br />6.Deployment and hosting of web applications on cloud platforms such as AWS, Azure, or GCP
                                        <br />7.Agile development methodologies, Git, and version control
                                        <br />8.User experience design and testing, and accessibility considerations
                                        <br />9.On Job Training - In Agile model, develop a realtime project using MERN stack.
                                    </p></div>
                                    <div><p className='py-[1rem]'>Throughout the course, participants will work on hands-on exercises, assignments, Q&A sessions,
                                        mini and major projects to apply their learning in real-world scenarios. By the end of the course, participants will have
                                        an in-depth understanding of full-stack development principles and best practices, as well as the practical skills needed to
                                        build and deploy modern web applications. </p></div>
                                </div>

                                <div className='border border-2 border-black rounded-md p-[2rem] lg:max-w-[55rem]'>
                                    <div><h1 className='text-[1.75rem] pb-[2rem]'>Skills you Learn</h1></div>
                                    <div className='flex flex-row flex-wrap gap-4'>
                                        <div><p className='bg-slate-400 px-[1.5rem] rounded-md'>AWS Cloud</p></div>
                                        <div><p className='bg-slate-400 px-[1.5rem] rounded-md'>MySQL</p></div>
                                        <div><p className='bg-slate-400 px-[1.5rem] rounded-md'>NodeJS</p></div>
                                        <div><p className='bg-slate-400 px-[1.5rem] rounded-md'>React JS</p></div>
                                        <div><p className='bg-slate-400 px-[1.5rem] rounded-md'>GIT</p></div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='border border-2 w-[26rem] my-[2rem] mx-[1rem] h-[38rem] border-black rounded-md p-[2rem] lg:max-w-[30rem] sticky top-[100px] bg-[#FCF8F3]'>
                            {/* image    */}
                            <div><img src={img12} alt='' className='pb-[2rem] hover:scale-110 w-[360px] h-[210px]' /></div>
                            <div><p>Price: <span className='font-bold text-violet-700'> ₹99</span></p></div>
                            <div><button className='bg-cyan-400 px-[2rem]  rounded-md ' onClick={handleOpen}>Enroll Now</button></div>
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

                <div className='xl:px-[28rem] md:px-[20rem] py-[2rem] fixed inset-0 bg-black bg-opacity-50'>
                    <div className='border border-2 bg-gray-400 rounded-md p-[4rem] max-w-[28rem]'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='pb-[2rem] text-[2rem]'>Enroll Now</h1>
                            <button className=' pb-[2rem] text-[1.5rem] text-white' onClick={handleClose}> X</button>
                        </div>
                        <div><label>Full Name</label></div>
                        <div><input type='name' placeholder='Enter name' className='w-[20rem]'></input></div>
                        <div className='mt-[1rem]'><label>Email</label></div>
                        <div><input type='email' placeholder='Enter email' className='w-[20rem]'></input></div>
                        <div className='mt-[1rem]'><label>Contact Number</label></div>
                        <div><input type='' placeholder='Enter number' className='w-[20rem]'></input></div>
                        <div className='mt-[1rem]'><label>City</label></div>
                        <div><input type='name' placeholder='Enter City' className='w-[20rem]'></input></div>
                        <div><button className='border border-2 rounded-md bg-violet-700 text-white px-[2rem] mt-[2rem]'>Submit</button></div>
                    </div>
                </div>

            )}


        </section>

    )
}

export default Wsaws