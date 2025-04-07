import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import api from '../Axios/Config';
import toast from 'react-hot-toast';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); 

    const navigate = useNavigate();

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`/auth/register`, {
                username,
                email,
                password,
                role 
            });

            toast.success("Registration Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed");
        }
    };

    return (
        <Layout>
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='bg-white shadow-2xl rounded-lg p-6 w-full max-w-md'>
                    <div className='flex flex-col gap-2 mb-4'>
                        <div className='text-md text-zinc-600 font-semibold animate-pulse'>START FOR FREE</div>
                        <div className='text-2xl md:text-4xl text-zinc-700'>Create new account.</div>
                        <div className='text-sm text-gray-600'>
                            Already a Member? <Link to="/login" className='text-blue-600 hover:underline'>Log in</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Username</label>
                            <div className='flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
                                <FaRegUser className='text-gray-500' />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className='outline-none p-1 flex-1'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <div className='flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
                                <MdEmail className='text-gray-500' />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
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
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Enter your password"
                                    className='outline-none p-1 flex-1'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Select Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='border border-blue-400 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500'
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <button
                            onClick={handleSubmit}
                            className='w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200'>
                            Create account
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
