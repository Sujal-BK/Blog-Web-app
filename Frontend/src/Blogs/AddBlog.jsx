import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Layout from '../Layout/Layout';
import api from '../Axios/Config';
import toast from 'react-hot-toast';
import SerachBlog from './SerachBlog';

const AddBlog = () => {
  const token = localStorage.getItem('token');
  const [Blogs, setBlogs] = useState([]);

  const config = {
    headers: {
      Authorization: `${token}`
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const { data } = await api.get("/blog/my-blogs", config); 
      setBlogs(data.blogs); 
      console.log(data.blogs);
    } catch (error) {
      console.error("Error fetching user-specific blogs:", error);
      toast.error("Failed to fetch your blogs");
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blog/delete-blog/${id}`, config);
      toast.success('Blog Deleted Successfully');
      fetchUserBlogs(); // Refresh list after delete
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error('Blog Deletion Failed');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 font-[Poppins]">
        <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
        <div className="overflow-x-auto">
          <SerachBlog />
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Blog Number</th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Blogs.length > 0 ? (
                Blogs.map((blog, index) => (
                  <tr key={blog._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-left">{index + 1}</td>
                    <td className="py-2 px-4 border-b text-left">{blog.title}</td>
                    <td className="py-2 px-4 border-b text-left">
                      <Link
                        to={`update-blog/${blog._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 inline-block hover:scale-105 duration-200"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded inline-block hover:scale-105 duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link
          to="create-blog"
          className="bg-blue-500 mt-4 inline-block rounded text-white p-2 hover:scale-105 duration-150"
        >
          Add Blog
        </Link>
      </div>
    </Layout>
  );
};

export default AddBlog;
