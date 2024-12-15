import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { FaRegUser , FaBars, FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from '../Context/auth';
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const {isLoggedIn}  = useAuth()

    return (
        <nav className="relative">
            <div className='flex justify-between items-center font-[Poppins] mx-5'>
                <div className='mx-16'>
                    <img src={logo} alt="Logo" className='md:w-30 md:h-28 hover:scale-105 duration-150' />
                </div>
                <div className='hidden md:flex items-center text-lg gap-10 mx-28'>
                    <Link  to='/'  className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Home</div></Link>
                    <Link  to='/blog' className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Blogs</div></Link>
                    <Link  to='privacy-policy'  className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Privacy Policy</div></Link>
                    {!isLoggedIn ? (<Link to='/register' className='flex items-center gap-2 hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div className='text-xl'><FaRegUser  /></div><div>Register</div></Link>):(<Link to='/logout' className='flex items-center gap-2 hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Logout</div></Link>)}
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMobileMenu} className='text-2xl'>
                        {isMobileMenuOpen ? <RxCross2 /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='fixed inset-0 w-full bg-white shadow-lg z-10'>
                    <div className='flex flex-col items-center text-lg gap-4 p-4'>
                        <Link  to='/' className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Home</div></Link>
                        <Link  to='/blog' className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Blogs</div></Link>
                        <Link  className='hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div>Privacy Policy</div></Link>
                        {!isLoggedIn ? (<Link to='/register'  className='flex items-center gap-2 hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div className='text-xl'><FaRegUser  /></div><div>Register</div></Link>):(<Link to='/logout'  className='flex items-center gap-2 hover:bg-blue-500 p-2 rounded-md hover:scale-105 duration-100 hover:text-white'><div className='text-xl'></div><div>logout</div></Link>)}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;