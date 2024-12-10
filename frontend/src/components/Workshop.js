import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Workshop = () => {
    const [card, setCard] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(''); // New state for selected workshop name

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        city: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8001/api/workshop')
            .then(response => {
                setCard(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpen = (workshopTitle) => {
        setSelectedWorkshop(workshopTitle); // Set the selected workshop title
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
            course_name: selectedWorkshop // Send selected workshop title
        })
            .then(response => {
                toast.success('Form filled successfully!', { autoClose: 1000 });
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
            <div className='bg-blue-950 text-zinc-50 px-[4rem] py-[2rem] '>
                <div className='text-center'>
                    <div><h1 className='text-[3rem]'>Workshop</h1></div>
                    <div><h4>Home  /  Workshop </h4></div>
                </div>
            </div>

            <div className='lg:grid gird-cols-1 place-content-center gap-4 p-[2rem]'>
                {card.length > 0 ?
                    card.map((item, index) => (
                        <div className='lg:flex flex-row lg:w-[48rem] p-[2rem] border border-4' key={index}>
                            <div><img
                                src={`http://localhost:8001/uploads/${item.image}`}
                                className='rounded-md transition duration-500 hover:scale-90 w-[250px] h-[200px]' /></div>
                            <div className='lg:pl-[4rem] '>
                                <div className='font-bold'> {item.title} </div>
                                <div className='mb-[3.6rem]'>{item.descr}</div>
                                <div className='lg:flex flex-row'>
                                    <div className='grow'>{new Date(item.date).toLocaleDateString()}&nbsp;&nbsp; ||&nbsp;&nbsp; ₹{item.cost} </div>
                                    <span>
                                        <a className='border border-2 bg-violet-700 text-[#FFFFFF] rounded-md px-[1.5rem]'
                                            onClick={() => handleOpen(item.title)}>
                                            Register
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : <p className='text-2xl font-bold'>No Data Found</p>}
            </div>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4'>
                        <div className='flex justify-between items-center mb-6'>
                            <h1 className='text-2xl font-semibold text-gray-800'>Enroll Now</h1>
                            <button
                                className='text-gray-600 hover:text-red-500 text-xl'
                                onClick={handleClose}>
                                X
                            </button>
                        </div>

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
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Workshop;
