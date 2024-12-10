import React from 'react';
import img1 from '../images/services/1.webp';
import img2 from '../images/services/2.webp';

const Services = () => {
    return (
        <section className='relative p-6 md:p-12 lg:p-20 bg-gradient-to-r from-gray-100 to-white'>
            <div className='text-center mb-12'>
                <h1 className='text-3xl md:text-4xl font-semibold text-gray-800'>Our Services</h1>
            </div>

            <div className='flex flex-col md:flex-row md:justify-between md:space-x-8 mb-16'>
                <div className='flex flex-col items-center md:items-start md:w-1/2'>
                    <p className='text-2xl font-semibold mb-4 text-gray-800'>Live Virtual Classes Taught by Industry Experts</p>
                    <p className='text-lg text-gray-600 mb-6'>
                        LIMITED TIME: Enroll in any of our live virtual classes today and receive a complimentary 3-month subscription to our online training library.
                        Our live virtual classes are interactive, engaging, and taught by industry experts. You will have the opportunity to ask questions and participate in discussions.
                        Plus, you will receive a complimentary 3-month subscription to our online training library.
                    </p>
                    <a href='/contact/contactus'>
                        <button className='px-6 py-2 rounded-full text-white bg-indigo-700 hover:bg-indigo-800 transition duration-300'>
                            Enquire Now
                        </button>
                    </a>
                </div>
                <div className='flex justify-center md:w-1/2'>
                    <img src={img1} alt="Virtual Classes" className='w-full h-auto md:w-[500px] md:h-[350px] rounded-xl shadow-lg' />
                </div>
            </div>

            <div className='flex flex-col md:flex-row md:justify-between md:space-x-8'>
                <div className='flex justify-center md:w-1/2'>
                    <img src={img2} alt="Cohort Learning" className='w-full h-auto md:w-[500px] md:h-[350px] rounded-xl shadow-lg' />
                </div>
                <div className='flex flex-col items-center md:items-start md:w-1/2'>
                    <p className='text-2xl font-semibold mb-4 text-gray-800'>Cohort-Based Learning with Peer-to-Peer Interaction</p>
                    <p className='text-lg text-gray-600 mb-6'>
                        In cohort-based learning, students are placed into groups (cohorts) of 10-15 students and work together for the entire program.
                        Cohorts are formed at the beginning of the program and remain together for the duration. Cohorts provide an opportunity for students to form social
                        connections and to learn from one another. Peers are also a valuable resource for providing support and motivation. In addition, cohort-based learning
                        allows for more interaction between students and instructors.
                    </p>
                    <a href='/contact/contactus'>
                        <button className='px-6 py-2 rounded-full text-white bg-indigo-700 hover:bg-indigo-800 transition duration-300'>
                            Enquire Now
                        </button>
                    </a>
                </div>
            </div>

            <hr className='my-12 border-gray-300' />
        </section>
    );
};

export default Services;
