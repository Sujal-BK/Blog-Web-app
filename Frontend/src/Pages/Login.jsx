import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../Axios/Config';
import { useAuth } from '../Context/auth';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('user'); // Default role
    const [email,setEmail]  =useState("")
    const [password,setPassword] = useState("")

    const {storeTokenInLS} = useAuth()
    const navigate = useNavigate() 
    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const {data} =  await api.post(`/auth/login`,{
                email,
                password,
                role
            })
           
            
            storeTokenInLS(data.token,role)
            toast.success("Login Successfully")
            navigate("/blog")
        } catch (error) {
            console.log(error);
            toast.error("Login Failed")
            
        }
    }

    return (
        <Layout>
            <div className='flex flex-col items-center justify-center  p-4'>
                <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
                    <div className='flex flex-col gap-2 mb-4'>
                        <div className='text-2xl md:text-4xl text-zinc-700'>Login to your account.</div>
                        <div className='text-sm text-gray-600'>
                            Don't have an account? <Link to="/register" className='text-blue-600 hover:underline'>Register</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <div className='flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
                                <MdEmail className='text-gray-500' />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    placeholder="Enter your email"
                                    className='outline-none p-1 flex-1'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Password</label>
                            <div className='flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
                                <button type="button" onClick={handlePassword} className='text-gray-500'>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className='outline-none p-1 flex-1'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='border border-blue-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500'
                            >
                                <option value="user">User </option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <button 
                        onClick={handleSubmit}
                        className='w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200'>
                            Login
                        </button>
                    </div>

                    <div className='mt-4 text-center'>
                        <Link to="#" className='text-blue-600 hover:underline'>Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;