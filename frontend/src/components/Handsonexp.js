import React from 'react';
import img1 from '../images/handsonexp/0-1.jpg';
import img2 from '../images/handsonexp/0-2.jpg';
import img3 from '../images/handsonexp/0-3.jpg';

const Handsonexp = () => {
    const card = [
        {
            title: "Workshop",
            image: img1,
            desc: "OPQ Tech draws on the best faculty and curriculum to equip you with the tools and techniques, to make you a more effective changemaker and leader....",
            link: "#"
        },
        {
            title: "Corporate Training",
            image: img2,
            desc: "In order to build in-depth skills and expertise in conducting corporate training programmes, OPQ Tech has developed the Advanced Skills for Practical..",
            link: "#"
        },
        {
            title: "Upskill with the OPQ Bootcamp",
            image: img3,
            desc: "The rigorous, immersive, collaborative, action-learning experience of OPQ Tech Innovation Leadership Bootcamps is now online...",
            link: "#"
        }
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Hands On Experience</h1>
                    {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition duration-300">
                        View All
                    </button> */}
                </div>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {card.map((item, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                            <div className="relative overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-56 object-cover transform hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.desc}</p>
                                <a href={item.link} className="text-blue-500 font-semibold hover:text-blue-700 transition duration-300">Explore more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Handsonexp;
