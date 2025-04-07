import Blog from "../Models/blog.model.js";
import User from "../Models/user.model.js";

// add blog
export const addBlog = async (req, res) => {
    try {
        const { title, description, content, coverImg, category, author } = req.body;

        if (!title || !description || !content || !coverImg || !category || !author) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Mandatory...",

            })
        }

        const addNewBlog = await Blog.create({
            title,
            description,
            content,
            coverImg,
            category,
            author
        })

        await User.findByIdAndUpdate(req.currentUser._id,{
            $push : {blogsId:addNewBlog._id}
        })

        return res.status(200).json({
            success: true,
            message: "Blog added Successfully...",
            addNewBlog
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Adding Blog...",
            error
        })

    }
}


// get blog
export const getBlog = async (req, res) => {
    try {
        const getBlogs = await Blog.find()
        if (!getBlogs) {
            return res.status(404).json({
                success: false,
                message: "No Blog is here...",
            })


        }
        return res.status(200).json({
            success: true,
            message: "Blogs info...",
            getBlogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting Blog...",
            error
        })

    }
}

//get blog by id
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const getBlog = await Blog.findById(id)
        if (!getBlog) {
            return res.status(404).json({
                success: false,
                message: "No Blog is here...",
            })


        }

        return res.status(200).json({
            success : true,
            message :'Blog is here',
            getBlog
        })
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting Blog...",
            error
        })

    }
}




//update blog
export const updateBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const updateBlog = await Blog.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true })

        // if (!updateBlog) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Blog not found...",

        //     })

        // }

        return res.status(200).json({
            success: true,
            message: "Blog is updated...",
            updateBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Blog...",
            error
        })
    }
}

//delete blog

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const deleteBlog = await Blog.findByIdAndDelete(id)
        if (!deleteBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found..."
            })

        }

        await Comment.deleteMany({id})

        return res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully...",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting Blog...",
            error
        })
    }
}


// search blog
export const serachBlog = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title query parameter is required.",
            });
        }

        const regex = new RegExp(title, 'i')
        const matchingBlogs = await Blog.find({ title: regex })

        if (matchingBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found with the given title.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Matching blogs found.",
            matchingBlogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in searching Blog...",
            error
        })
    }
}


export const getUserSpecifBlog = async (req, res) => {
    try {
      const userId = req.currentUser._id;
  
      const user = await User.findById(userId).populate({
        path: "blogsId",
        select: "_id title description", 
      });
  
      console.log(user);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Your Blogs fetched successfully!",
        blogs: user.blogsId,
      });
  
    } catch (error) {
      console.error("Error in getUserSpecifBlog:", error);
      return res.status(500).json({
        success: false,
        message: "Error while getting user-specific blogs.",
        error,
      });
    }
  };
  