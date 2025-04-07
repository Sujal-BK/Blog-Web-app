import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Blogs</Link></li>
            
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Resources or Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: contact@blog.com</p>
          <p className="text-sm mt-1">Phone: +1 (555) 123-4567</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition text-xl"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition text-xl"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YourBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
