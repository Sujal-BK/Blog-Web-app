import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Axios/Config';
import toast from 'react-hot-toast';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverImg, setCoverImg] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  const getBlogById = async () => {
    try {
      const { data } = await api.get(`/blog/get-blog/${id}`);
      const blog = data.getBlog;
      setAuthor(blog.author);
      setDescription(blog.description);
      setContent(blog.content);
      setTitle(blog.title);
      setCategory(blog.category);
     
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch blog data');
    }
  };

  useEffect(() => {
    getBlogById();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('content', content);
      formData.append('description', description);

      if (coverImg) {
        formData.append('coverImg', coverImg); 
      }

      const { data } = await api.put(`/blog/update-blog/${id}`, formData, config);
      toast.success('Blog Updated Successfully');
      navigate('/add-blog');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update blog');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 font-[Poppins]">
        <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="coverImg" className="block text-gray-700 text-sm font-bold mb-2">New Cover Image (optional)</label>
            <input type="file" id="coverImg" accept="image/*" onChange={(e) => setCoverImg(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="6" required></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateBlog;
