import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import toast from 'react-hot-toast';
import api from '../Axios/Config';
import { MdEmail } from "react-icons/md";
import { FaLock, FaKey } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const naviate = useNavigate()

  const handleSentOtp = async () => {
    try {
      const { data } = await api.post(`/auth/forgot-password`, { email });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleChangePassword = async () => {
    try {
      const { data } = await api.post(`/auth/verify-otp`, {
        email,
        otp,
        newPassword,
      });
      toast.success(data.message);
      naviate('/login')
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="text-2xl md:text-3xl text-zinc-700 mb-4">Forgot Password</div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <MdEmail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none flex-1 p-1"
                />
              </div>
            </div>

            {/* Send OTP button */}
            <button
              onClick={handleSentOtp}
              className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-200"
            >
              Send OTP
            </button>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <div className="flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <FaKey className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="outline-none flex-1 p-1"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="flex items-center border border-blue-400 p-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="outline-none flex-1 p-1"
                />
              </div>
            </div>

            {/* Change Password */}
            <button
              onClick={handleChangePassword}
              className="w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
