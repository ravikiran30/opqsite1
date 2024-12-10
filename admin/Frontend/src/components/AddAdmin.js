import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode }from 'jwt-decode'; // For decoding the JWT token
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AddAdmin = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const simpleHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
      };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const authorizedEmail = 'ravi@gmail.com';
                const email = decoded?.admin_email || '';// Use optional chaining to handle missing fields
                console.log(email)
                console.log(authorizedEmail)
                setIsAuthorized(email === authorizedEmail);
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthorized(false);
            }
        } else {
            setIsAuthorized(false);
        }
    }, []);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const hashedPassword = simpleHash(data.password);
        console.log(hashedPassword)
        try {
            const response = await axios.post('http://localhost:8001/api/addadmin', {
                admin_name: data.username,
                admin_email: data.email,
                admin_password: hashedPassword, // Ideally, hash the password before sending
            });
            toast.success('Admin added successfully!', { autoClose: 1000 });
            reset();
        } catch (error) {
            toast.error('An error occurred while submitting the form');
        }
    };

    // if (!isAuthorized) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <p className="text-xl font-semibold">You are not authorized to access this page.</p>
    //         </div>
    //     );
    // }

    return (
        <section className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8 flex-1 overflow-auto">
                    <div className="flex justify-center items-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
                    {!isAuthorized ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl font-semibold text-red-500">
                            You are not authorized to access this page.
                        </p>
                    </div>):(
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white p-6 rounded shadow-md w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center">Admin Register</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    {...register('username')}
                                    className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                                        errors.username ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                                        errors.email ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                                        errors.password ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                                        errors.confirmPassword ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </form>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddAdmin;
