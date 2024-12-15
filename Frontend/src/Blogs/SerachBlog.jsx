import React, { useState } from 'react';
import api from '../Axios/Config'; 

const SerachBlog = () => {
  const [searchedBlog, setSearchedBlog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchBlog = async () => {
    if (!searchTerm) {
      setSearchedBlog([]); 
      return;
    }
    try {
      const { data } = await api.get(`blog/search?title=${searchTerm}`); 
      console.log(data);
      setSearchedBlog(data.matchingBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    searchBlog(); 
  };

  return (
    <div>
      <div className="container mx-auto p-4 font-[Poppins]">
        

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded w-full md:w-1/2"
          />
        </div>

        {/* Display Searched Blogs */}
        {searchedBlog.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Blog Number</th>
                  <th className="py-2 px-4 border-b text-left">Title</th>
                </tr>
              </thead>
              <tbody>
                {searchedBlog.map((blog, index) => (
                  <tr key={blog._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-left">{index + 1}</td>
                    <td className="py-2 px-4 border-b text-left">{blog.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          searchTerm && (
            <p className="mt-4 text-gray-500">No blogs found for "{searchTerm}".</p>
          )
        )}
      </div>
    </div>
  );
};

export default SerachBlog;