import React, { useEffect, useState } from 'react'
import api from '../Axios/Config'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {

    const {id} = useParams()
    const [Blog,setBlog] = useState([])
    
    const getBlogById = async() =>{
      try {
        const {data} = await api(`/blog/get-blog/${id}`)
        setBlog(data.getBlog)
        console.log(data.getBlog);
        
      } catch (error) {
        console.log(error);
        
      }

    }

    useEffect(()=>{
  getBlogById()
    },[id])
  return (
    <div className="container mx-auto px-4 py-8 font-[Poppins]">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={Blog.coverImg} alt={Blog.title} className="w-full h-64 object-cover" />
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{Blog.title}</h1>
            <p className="text-gray-600 text-sm mb-1">By {Blog.author}</p>
            <p className="text-gray-500 text-xs mb-1">{new Date(Blog.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-500 text-xs mb-4">Category: {Blog.category}</p>
            <p className="text-gray-700 mb-4">{Blog.description}</p>
            <p className="text-gray-700 mb-4">{Blog.content}</p>
        </div>
    </div>
</div>
  )
}

export default SingleBlog
