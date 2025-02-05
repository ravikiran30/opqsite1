import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contactus = () => {
    const [firstNum, setFirstNum] = useState(0);
    const [secondNum, setSecondNum] = useState(0);
    const [userSum, setUserSum] = useState('');
    const [sumError, setSumError] = useState(''); // State for sum error
  
    // Function to generate random numbers
    const generateRandomNumbers = () => {
      setFirstNum(Math.floor(Math.random() * 10) + 1);
      setSecondNum(Math.floor(Math.random() * 10) + 1);
      setUserSum('');
      setSumError(''); // Reset error when new numbers are generated
    };
  
    useEffect(() => {
      generateRandomNumbers();
    }, []);
  
    // Define the Yup validation schema
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      query: Yup.string().required('Message is required'),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(validationSchema),
    });
  
    // Handle form submission
    const onSubmit = async (data) => {
      const correctSum = firstNum + secondNum;
      if (parseInt(userSum, 10) !== correctSum) {
        setSumError('Please enter the correct sum');
        return;
      }
  
      const payload = {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        query: data.query,
      };
  
      try {
        const response = await axios.post(
          'https://gcrpo34w91.execute-api.ap-south-1.amazonaws.com/contactform21',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
            toast.success('Form submitted successfully!', { autoClose: 1000 });
          reset(); // Reset form fields after successful submission
          generateRandomNumbers(); // Reset the numbers for the next submission
        } else {
            toast.error('An error occurred ');
          console.error('An error occurred');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occurred while submitting the form');
      }
    };

  return (
    <section>
      <div>
        <div className="bg-blue-950 text-zinc-50 px-[4rem] py-[2rem]">
          <div className="text-center">
            <div>
              <h1 className="text-[3rem]">Contact Us</h1>
            </div>
            <div>
              <h4>Home / Contact</h4>
            </div>
          </div>
        </div>
        <p className="m-[2rem] text-center text-[1.25rem]">
          We are looking forward to getting in collaboration with you
        </p>
        <div className="m-[2rem] text-[1rem]">
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex items-center">
              <i className="fas fa-envelope text-blue-500 mr-2"></i>
              <span>contact@opqbootcamp.com</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-blue-500 mr-2"></i>
              <span>080-468-10558</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              <span>No.22, Hosur Rd, 7th Block, Koramangala, Bangalore, Karnataka-560095</span>
            </div>
            <div className="flex items-center">
              <i className="far fa-clock text-blue-500 mr-2"></i>
              <span>Mon - Sat: 9am - 5pm</span>
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-2 m-[2rem]">
          <div>
            <iframe
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=No.%2022,%20Hosur%20Rd,%207th%20Block,%20Koramangala,%20Bangalore,%20Karnataka-560095+(OPQtech)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
          <div>
            <form
              className="max-w-md mx-auto mt-[2rem] p-6 bg-white shadow-md rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              
              <h2 className="text-2xl font-bold mb-4">Quick Enquiry</h2>

              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Contact Number Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('contactNumber')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 mt-1">{errors.contactNumber.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Query Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('query')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                ></textarea>
                {errors.query && (
                  <p className="text-red-500 mt-1">{errors.query.message}</p>
                )}
              </div>

              {/* Sum Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  What is {firstNum} + {secondNum}?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userSum}
                  onChange={(e) => setUserSum(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  required
                />
                {sumError && <p className="text-red-500 mt-1">{sumError}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Submit
              </button>
            
          
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
