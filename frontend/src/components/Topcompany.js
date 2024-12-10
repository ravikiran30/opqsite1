import React from 'react';
import img1 from '../images/client/altimetrik.png';
import img2 from '../images/client/devon.png';
import img3 from '../images/client/intel.png';
import img4 from '../images/client/nagarro.png';
import img5 from '../images/client/publicis-sapient.png';
import '../index.css';

const Topcompany = () => {
    const imglink = [
        { link: img1 },
        { link: img2 },
        { link: img3 },
        { link: img4 },
        { link: img5 }
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Top Companies Recruiting with Us</h2>
                    <p className="text-lg font-light text-gray-600 mt-4">
                        Healthcare, technology, food service, and many other industries are now recruiting with us. <br />
                        Check out the entire list right now to see if one is a good fit for you!
                    </p>
                </div>
                <div className="flex flex-wrap justify-center mt-12 gap-8">
                    {imglink.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden w-48 h-48 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:rotate-3 transition-all duration-300"
                        >
                            <img
                                src={item.link}
                                alt="Company Logo"
                                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            />
                           
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Topcompany;
