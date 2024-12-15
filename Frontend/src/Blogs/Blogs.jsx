import React, { useEffect, useState } from 'react';
import api from '../Axios/Config';
import { Link } from 'react-router-dom';
import SerachBlog from './SerachBlog';
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async () => {
        try {
            const { data } = await api.get("/blog/get-blogs");
            setBlogs(data.getBlogs);
            console.log(data.getBlogs);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    // Function to truncate the description
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-8 font-[Poppins]">
                <h1 className="text-3xl font-bold mb-6">Blogs</h1>

                <SerachBlog/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={blog.coverImg} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-600 text-sm mb-1">By {blog.author}</p>
                                <p className="text-gray-500 text-xs mb-1">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-500 text-xs mb-1">Category: {blog.category}</p>
                                <p className="text-gray-700 mb-4">
                                    {truncateDescription(blog.description, 100)} {/* Limit to 100 characters */}
                                </p>
                                <Link to={`/blog/${blog._id}`} >
                                Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;