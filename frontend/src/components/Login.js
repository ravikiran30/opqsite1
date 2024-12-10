import React ,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'


const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };


    return (
        <section>
            <div className=' xl:px-[28rem] md:px-[20rem] py-[2rem]'>
                <div className=' border border-2 bg-gray-400 rounded-md p-[4rem] max-w-[28rem] '>
                    <h4 className='text-bold text-[3rem] text-center pb-[3rem]'>Login</h4>
                    <div><label className='text-left' name='email'>Email</label></div>
                    <div><input placeholder='Enter email' className='border border-2 rounded-md ' type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required /></div>

                    <div><label className='text-left' name='password'>Password</label></div>
                    <div><input type='password' placeholder='Enter Password' className='border border-2 rounded-md max-w-96 ' value={password}
                    onChange={(e) => setPassword(e.target.value)} required /></div>

                    <div className='pt-[1.5rem]'><button className='border border-2 rounded-md bg-violet-700 text-white px-[2rem]' onClick={handleSubmit}>Login</button></div>
                    <a > Forgot Password?</a>
                </div>
            </div>
        </section>
    )
}

export default Login
