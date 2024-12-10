import React from 'react'
import { FaInstagram ,FaTwitter,FaFacebook } from "react-icons/fa";




const Footer = () => {
  return (
    <section className='bg-[#282834] text-[#7E7E78] '>
        <div className='lg:p-[4rem] md:grid grid-cols-4 gap-1.5 text-lg' >
            <div className='p-[1.5rem]'>
                <h6 className='text-[#FFFFFF] pb-[2rem] font-bold text-2xl'> Our Company</h6>
               
                <li><a href="" className='hover:text-blue-700'>Home</a></li>
                <li><a href='' className='hover:text-blue-700'>About Us</a></li>
                <li><a href='' className='hover:text-blue-700'>Blogs</a></li>
                <li><a href='' className='hover:text-blue-700'>Contact Us</a></li>

                
            </div>

            <div  className='p-[1.5rem]'>
            <h6 className='text-[#FFFFFF] pb-[2rem] font-bold text-2xl'> Courses</h6>
                <ul>
                <li><a href='' className='hover:text-blue-700'>Full Stack Developer Course</a></li>
                <li><a href='' className='hover:text-blue-700'>AWS Cloud Practitione</a></li>
                <li><a href='' className='hover:text-blue-700'>Devops Bootcamp</a></li>
                </ul>

            </div>
            <div  className='p-[1.5rem]'>
            <h6 className='text-[#FFFFFF] pb-[2rem] font-bold text-2xl'>Quick Links</h6>
                <li><a href='' className='hover:text-blue-700'>Login</a></li>
                <li><a href='' className='hover:text-blue-700'>Privacy Policy</a></li>
                <li><a href='' className='hover:text-blue-700'>Terms & Conditions</a></li>
                <li><a href='' className='hover:text-blue-700'>Security</a></li>

            </div>
            <div  className='p-[1.5rem] pb-[2rem]'>
                <h6 className='text-[#FFFFFF] font-bold text-2xl'> Follow Us</h6>
                <p>No. 22, Hosur Rd, 7th Block,<br/>
                Koramangala, Bangalore,<br/>
                Karnataka - 560095<br/></p>
                <p className='hover:text-blue-700'>+91 9876543210</p>
                <p className='hover:text-blue-700'>contact@opqbootcamp.com</p>
                <div className='flex flex-row'>
                <FaInstagram />
                <FaTwitter />
                <FaFacebook />
                </div>

            </div>
        </div>
        <hr/>
        <div className="col-lg-12 col-sm-12  mt-2 mb-2 text-center text-white p-[.75rem]">
        Copyright © 2022 <a href="" className="fs-14 text-blue-700 ">Opqbootcamp</a>. All rights reserved.
        </div>
    </section>
  )
}

export default Footer
