import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Addworkshop = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    image: Yup.mixed().test('fileType', 'Only JPG files are allowed', (value) => {
      return value && value[0] && value[0].type === 'image/jpeg';
    }).required('Image is required'),
    author: Yup.string().required('Author is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    descr: Yup.string().required('Description is required'),
    cost: Yup.string().required('Cost is required'),
    link: Yup.string().url('Invalid URL format'),
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
        'http://localhost:8001/api/addworkshop',
        {
          title: data.title,
          image: data.image[0],
          author: data.author,
          date: data.date,
          time: data.time,
          descr: data.descr,
          cost: data.cost,
          link: data.link,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success('Workshop added successfully!', { autoClose: 1000 });
          reset(); 
        } else {
          toast.error('An error occurred while adding the Workshop');
        }
      });
  };

  return (
    <section className="flex h-screen">
      <div className="App">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 flex-1 overflow-auto">
          <div className="flex justify-center items-center grow bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-8 md:p-12 lg:p-16">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Add Webinar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('author')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.author ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.author && <p className="text-red-500 text-xs">{errors.author.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    {...register('time')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.time ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                    Cost<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('cost')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cost ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.cost && <p className="text-red-500 text-xs">{errors.cost.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                    Link<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    {...register('link')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.link ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.link && <p className="text-red-500 text-xs">{errors.link.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="descr" className="block text-sm font-medium text-gray-700">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('descr')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.descr ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.descr && <p className="text-red-500 text-xs">{errors.descr.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Image (JPG only)<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    {...register('image')}
                    accept=".jpg,.jpeg"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
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

export default Addworkshop;
