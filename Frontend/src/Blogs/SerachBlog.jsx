import React, { useState, useEffect } from 'react';
import api from '../Axios/Config';
import { Link } from 'react-router-dom';

const SearchBlog = () => {
  const [searchedBlog, setSearchedBlog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const searchBlog = async () => {
    if (!searchTerm.trim()) {
      setSearchedBlog([]);
      setNoResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.get(`blog/search?title=${searchTerm}`);
      setSearchedBlog(data.blogs || []);
      setNoResults((data.blogs || []).length === 0);
    } catch (error) {
      console.log(error);
      setSearchedBlog([]);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchBlog();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />
      </div>

      {isLoading && (
        <p className="mt-4 text-center text-gray-500 text-sm sm:text-base">
          Searching...
        </p>
      )}

      {!isLoading && noResults && (
        <p className="mt-4 text-center text-red-500 text-sm sm:text-base">
          No blogs found for "{searchTerm}"
        </p>
      )}

      {!isLoading && searchedBlog.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-blue-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {searchedBlog.map((blog, idx) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <Link to={`${blog._id}`}><td className="px-4 py-2 border text-blue-600 font-semibold" >{blog.title}</td></Link>
                  <td className="px-4 py-2 border">{blog.author?.username || 'N/A'}</td>
                  <td className="px-4 py-2 border">{new Date(blog.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default SearchBlog;
