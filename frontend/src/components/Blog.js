import React from 'react';
import img1 from '../images/blog/855963_blog-thumb-img-1.jpg';
import img2 from '../images/blog/426573_blog-thumb-img-2.jpg';
import img3 from '../images/blog/726922_blog-thumb-img-3.jpg';

const Blog = () => {
    const card = [
        {
            title: "Importance Of Agile Framework",
            image: img1,
            author: "Sunil Pradhan",
            date: "2022-01-01",
            category: "Technology",
            link: "#"
        },
        {
            title: "Which Job In India Pays The Most",
            image: img2,
            author: "Sunil Pradhan",
            date: "2022-06-01",
            category: "Business",
            link: "#"
        },
        {
            title: "Why Learn To Python In 2022?",
            image: img3,
            author: "Sunil Kumar",
            date: "2022-10-01",
            category: "Technology",
            link: "#"
        }
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Latest Blog Posts</h2>
                    <p className="text-lg font-light text-gray-600 mt-4">
                        Explore our latest articles on technology, business, and more. Stay updated with insightful content!
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {card.map((item, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover transition-transform duration-500 transform hover:scale-105"
                            />
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">
                                    <span className="font-semibold text-blue-600">{item.category}</span> • {item.date}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    <a href={item.link} className="hover:text-blue-600">{item.title}</a>
                                </h3>
                                <p className="text-gray-600 mb-4">by <span className="font-semibold text-gray-800">{item.author}</span></p>
                                <a href={item.link} className="text-blue-500 hover:text-blue-700 font-semibold">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
