import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useHandleAuthError } from './ErrorAuth';


const Addcourse = () => {
  // Validating schema using Yup
  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    courseName: Yup.string().required('Course Name is required'),
    courseUrl: Yup.string().url('Invalid URL format').required('Course URL is required'),
    courseFee: Yup.number().positive('Course Fee must be positive').required('Course Fee is required'),
    skills: Yup.string(),
    shortDescription: Yup.string(),
    fullDescription: Yup.string(),
    overview: Yup.string(),
    whatWillYouLearn: Yup.string(),
    courseRequirements: Yup.string(),
    whoIsThisCourseFor: Yup.string(),
    courseImage: Yup.mixed().test('fileType', 'Only JPG files are allowed', (value) => {
      return value && value[0] && value[0].type === 'image/jpeg';
    }),
    bannerImage: Yup.mixed().test('fileType', 'Only JPG files are allowed', (value) => {
      return value && value[0] && value[0].type === 'image/jpeg';
    }),
    syllabusPdf: Yup.mixed().test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value[0] && value[0].type === 'application/pdf';
    }),
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
  const handleAuthError = useHandleAuthError();
  const onSubmit = (data) => {
    
    axios
      .post(
        'http://localhost:8001/api/addcourse',
        {
 
          category: data.category,
          courseName: data.courseName,
          courseUrl: data.courseUrl,
          courseFee: data.courseFee,
          skills: data.skills,
          shortDescription: data.shortDescription,
          fullDescription: data.fullDescription,
          overview: data.overview,
          whatWillYouLearn: data.whatWillYouLearn,
          courseRequirements: data.courseRequirements,
          whoIsThisCourseFor: data.whoIsThisCourseFor,
          courseImage: data.courseImage[0],
          bannerImage: data.bannerImage[0],
          syllabusPdf: data.syllabusPdf[0],
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
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Course Registration Form</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('category')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                    Course Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('courseName')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.courseName ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="courseUrl" className="block text-sm font-medium text-gray-700">
                    Course URL<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    {...register('courseUrl')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.courseUrl ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.courseUrl && <p className="text-red-500 text-xs">{errors.courseUrl.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="courseFee" className="block text-sm font-medium text-gray-700">
                    Course Fee<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('courseFee')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.courseFee ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.courseFee && <p className="text-red-500 text-xs">{errors.courseFee.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    Skills [use '||' this symbol as separator amoung the list of skills] <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('skills')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.skills ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.skills && <p className="text-red-500 text-xs">{errors.skills.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('shortDescription')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.shortDescription && <p className="text-red-500 text-xs">{errors.shortDescription.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('fullDescription')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="4"
                  />
                  {errors.fullDescription && <p className="text-red-500 text-xs">{errors.fullDescription.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
                    Overview <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('overview')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.overview ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.overview && <p className="text-red-500 text-xs">{errors.overview.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="whatWillYouLearn" className="block text-sm font-medium text-gray-700">
                    What Will You Learn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('whatWillYouLearn')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.whatWillYouLearn ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.whatWillYouLearn && <p className="text-red-500 text-xs">{errors.whatWillYouLearn.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="courseRequirements" className="block text-sm font-medium text-gray-700">
                    Course Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('courseRequirements')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.courseRequirements ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.courseRequirements && <p className="text-red-500 text-xs">{errors.courseRequirements.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="whoIsThisCourseFor" className="block text-sm font-medium text-gray-700">
                    Who Is This Course For <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('whoIsThisCourseFor')}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.whoIsThisCourseFor ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                    rows="3"
                  />
                  {errors.whoIsThisCourseFor && <p className="text-red-500 text-xs">{errors.whoIsThisCourseFor.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700">
                    Upload Course Image (JPG only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    {...register('courseImage')}
                    accept=".jpg,.jpeg"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.courseImage ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.courseImage && <p className="text-red-500 text-xs">{errors.courseImage.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">
                    Upload Banner Image (JPG only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    {...register('bannerImage')}
                    accept=".jpg,.jpeg"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.bannerImage ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.bannerImage && <p className="text-red-500 text-xs">{errors.bannerImage.message}</p>}
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label htmlFor="syllabusPdf" className="block text-sm font-medium text-gray-700">
                    Upload Syllabus (PDF only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    {...register('syllabusPdf')}
                    accept=".pdf"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${errors.syllabusPdf ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-indigo-200 focus:border-indigo-400`}
                  />
                  {errors.syllabusPdf && <p className="text-red-500 text-xs">{errors.syllabusPdf.message}</p>}
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

export default Addcourse;
