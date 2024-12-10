import React from 'react';
import img1 from '../images/icon-1.png';
import img2 from '../images/icon-2.png';
import img3 from '../images/icon-3.png';

const Aboutus = () => {

    const about = [
        {
            img: img1,
            title: "Mission",
            desc: "OPQ Tech is on a mission to be the most trusted lifelong learning partner, helping every member on the global platform achieve their career success and reach their goals."
        },
        {
            img: img2,
            title: "Who We Are",
            desc: "OPQ Tech is a team of professionals dedicated to helping people make career decisions and plan their careers. We provide advice on career paths, job search strategies, and skill improvement for your desired career."
        },
        {
            img: img3,
            title: "What You Get",
            desc: "OPQ Tech offers career advice and guidance to those seeking to make a change in their professional lives. We provide one-on-one consultations, group workshops, and online resources to help you identify your strengths, interests, and goals."
        }
    ];

    return (
        <section className="py-16 px-8 bg-gradient-to-r from-gray-100 to-white">
            <div className="max-w-7xl mx-auto">
                {/* About Us Section */}
                <div className="text-center mb-12">
                    <h4 className="text-4xl font-bold text-gray-800">About Us</h4>
                    <p className="text-gray-600 mt-4">Learn more about our mission, who we are, and what we offer.</p>
                </div>

                {/* About Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {about.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <div className="w-24 h-24 mb-4">
                                <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <h5 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h5>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center bg-blue-100 p-8 rounded-lg shadow-md">
                        <h4 className="text-2xl font-bold text-blue-600">Students</h4>
                        <p className="text-gray-700 mt-2">110+ Students</p>
                    </div>
                    <div className="flex flex-col items-center text-center bg-pink-100 p-8 rounded-lg shadow-md">
                        <h4 className="text-2xl font-bold text-pink-600">Placement</h4>
                        <p className="text-gray-700 mt-2">80+ Students</p>
                    </div>
                    <div className="flex flex-col items-center text-center bg-green-100 p-8 rounded-lg shadow-md">
                        <h4 className="text-2xl font-bold text-green-600">Online Sessions</h4>
                        <p className="text-gray-700 mt-2">1080+ online sessions</p>
                    </div>
                    <div className="flex flex-col items-center text-center bg-indigo-100 p-8 rounded-lg shadow-md">
                        <h4 className="text-2xl font-bold text-indigo-600">Total Courses</h4>
                        <p className="text-gray-700 mt-2">3+ Courses</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Aboutus;
