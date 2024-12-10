import React, { useState } from 'react';

const Enroll = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-2xl font-semibold text-gray-800'>Enroll Now</h1>
              <button
                className='text-gray-600 hover:text-red-500 text-xl'
                onClick={handleClose}
              >
                X
              </button>
            </div>

            {/* Form Section */}
            <form>
              {/* Personal Information Section */}
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Personal Information</h2>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    placeholder='Enter full name'
                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    placeholder='Enter email'
                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Contact Number
                  </label>
                  <input
                    type='text'
                    placeholder='Enter contact number'
                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              {/* Location Section */}
              <div className='mt-6 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Location Information</h2>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    City
                  </label>
                  <input
                    type='text'
                    placeholder='Enter city'
                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Country
                  </label>
                  <input
                    type='text'
                    placeholder='Enter country'
                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              {/* Submit Section */}
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Enroll;
