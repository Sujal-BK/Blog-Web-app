import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import api from '../Axios/Config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Details = () => {
  const [coverImg, setCoverImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `${token}`
    }
  };

  const addBlogs = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const { data } = await api.post('/blog/add-blog', {
        author,
        coverImg,
        content,
        category,
        description,
        title
      }, config);
      console.log(data);
      // Clear the form fields
      setAuthor("");
      setCoverImg("");
      setContent("");
      setCategory("");
      setDescription("");
      setTitle("");
      toast.success('Blog Added Successfully');
      navigate('/add-blog')
    } catch (error) {
      console.log(error);
      toast.error('Error in Blog adding');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 font-[Poppins]">
        <h1 className="text-2xl font-bold mb-4">Add Blog Details</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={addBlogs}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImg">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImg"
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold  mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="6"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Details;