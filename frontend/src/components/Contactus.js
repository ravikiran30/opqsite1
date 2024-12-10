
import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';



const Contactus = () => { 
    const [captchaToken, setCaptchaToken] = useState(null);
    const key="6LfinCMqAAAAAP0fdD6toIQ3YAKQMZZMJ1knpOLD"

    // Define the Yup validation schema
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      message: Yup.string().required('Message is required'),
      method: Yup.string().required('Please select a contact method'),
      
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
    const onSubmit = (data) => {
        if (!captchaToken) {
            toast.error('Please complete the CAPTCHA');
          return;
        }
    
        axios.post('http://localhost:8001/api/contact', {
            name: data.name,
            phone_number: data.phone,
            email: data.email,
            message: data.message,
            contactMethod: data.method,
          captchaToken,
        }).then((response) => {
          if (response.status === 200) {
            toast.success('Form submitted successfully!',{autoClose:1000});
            reset(); // Reset form fields after successful submission
            setCaptchaToken(null); // Reset captcha
          }else{
            toast.error('An error occurred while submitting the form');
          }
        });
    
    }
  
    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
      };
    


    const contact = {
        email: "contact@opqbootcamp.com",
        phoneNumber: "080-468-10558",
        location: "No.22,Hosur Rd, 7th Block, Kormangala, Bnagalore,Karnataka-560095",
        timing: "Mon - Sat: 9am - 5pm"
    };


    return (
        <section>
            <div >
                <div className='bg-blue-950 text-zinc-50 px-[4rem] py-[2rem] '>
                    <div className=' text-center'>

                        <div><h1 className='text-[3rem]'>Contact Us</h1></div>
                        <div><h4>Home  /  Contact </h4></div>


                    </div>
                </div>
                <p className='m-[2rem] text-center text-[1.25rem]'>We are looking forward to get in collaboration with you</p>
                <div className='m-[2rem] text-[1rem]'>
                    <div className="flex flex-col space-y-4 p-4">
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-blue-500 mr-2"></i>
                            <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-phone-alt text-blue-500 mr-2"></i>
                            <span>{contact.phoneNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                            <span>{contact.location}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="far fa-clock text-blue-500 mr-2"></i>
                            <span>{contact.timing}</span>
                        </div>
                    </div>



                </div>

                <div className='lg:grid grid-cols-2 m-[2rem]'>
                    <div>
                        <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=No.%2022,%20Hosur%20Rd,%207th%20Block,%20Koramangala,%20Bangalore,%20Karnataka-560095+(OPQtech)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <a href="https://www.gps.ie/">gps devices</a></iframe>
                    </div>
                    <div>
                        <form className="max-w-md mx-auto mt-[2rem] p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-2xl font-bold mb-4">Quick Enquiry</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
                                <input
                                    type="text" {...register('name')} 
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                                    required
                                />
                                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                                <input
                                    type="text" {...register('email')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                                    required
                                />
                                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number<span className="text-red-500">*</span></label>
                                <input
                                    type="text" {...register('phone')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                                    required
                                />
                                 {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="query" className="block text-sm font-medium text-gray-700">Query<span className="text-red-500">*</span></label>
                                <textarea
                                    {...register('message')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                                    rows="4"
                                    required
                                />
                                 {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Select a Contact Method:<span className="text-red-500">*</span></label>
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio" {...register('method')}
                                        id="phoneCall"
                                        value="Phone Call"
                                        className="mr-2"
                                    />
                                    <label htmlFor="phoneCall" className="text-gray-700">Phone Call</label>
                                </div>

                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio" {...register('method')}
                                        id="message"
                                        value="Message"
                                        className="mr-2"
                                    />
                                    <label htmlFor="message" className="text-gray-700">Message</label>
                                </div>
                                {errors.method && <p className='text-red-500'>{errors.method.message}</p>}
                            </div>



                            <div>
                                <ReCAPTCHA
                                    sitekey={key} // Replaced with your site key
                                    onChange={onCaptchaChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 "
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </section>

    )
}

export default Contactus