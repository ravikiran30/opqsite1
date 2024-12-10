import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Addstudent = () => {
  // Validating schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string(),
    dob: Yup.date().required('Date of Birth is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    photo: Yup.mixed().test('fileType', 'Only JPG files are allowed', (value) => {
      return value && value[0] && value[0].type === 'image/jpeg';
    }).required('Photo is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle submit form
  const onSubmit = (data) => {
    axios
      .post(
        'http://localhost:8001/api/addstudent',
        {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dob,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber,
          state: data.state,
          city: data.city,
          photo: data.photo[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success('Form submitted successfully!', { autoClose: 1000 });
          reset(); 
        } else {
          toast.error('An error occurred while submitting the form');
        }
      });
  };

  return (
    <section className="flex h-screen">
        <div className="App">
       <Sidebar/>
      </div>
      <div className="flex-1 flex flex-col">
       <Navbar/>
       <div className="p-8 flex-1 overflow-auto">
       <div className="flex justify-center items-center grow bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-8 md:p-12 lg:p-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Student Registration Form</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('firstName')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('dob')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('phoneNumber')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('state')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('city')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div>
            <div className="mb-4 sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address<span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('address')}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                rows="3"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>
            <div className="mb-4 sm:col-span-2">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Upload Photo (JPG only)<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                {...register('photo')}
                accept=".jpg,.jpeg"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.photo ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
              />
              {errors.photo && <p className="text-red-500 text-xs">{errors.photo.message}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 w-full py-3 bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300"
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

export default Addstudent;
