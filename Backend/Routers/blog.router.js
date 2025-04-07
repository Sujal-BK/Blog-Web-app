import express from 'express'
import { addBlog, deleteBlogById, getBlog, getBlogById, getUserSpecifBlog, serachBlog, updateBlogById } from '../Controllers/blog.controller.js'
import { isAdmin, jsonAuthMiddleware } from '../Middlewares/auth.middleware.js'


const router = express.Router()


//add blog
router.post("/add-blog",jsonAuthMiddleware,isAdmin,addBlog)


//get blog
router.get("/get-blogs",getBlog)


//get blog by id
router.get("/get-blog/:id",getBlogById)


//update blog
router.put("/update-blog/:id",jsonAuthMiddleware,isAdmin,updateBlogById)


//delete blog
router.delete("/delete-blog/:id",jsonAuthMiddleware,isAdmin,deleteBlogById)


//search blog
router.get("/search",serachBlog)


router.get("/my-blogs", jsonAuthMiddleware, isAdmin, getUserSpecifBlog);

export default router


