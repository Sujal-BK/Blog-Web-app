import express from 'express'
import { addBlog, deleteBlogById, getBlog, getBlogById, getUserSpecifBlog, searchBlog, updateBlogById } from '../Controllers/blog.controller.js'
import { isAdmin, jsonAuthMiddleware } from '../Middlewares/auth.middleware.js'
import upload from '../Middlewares/multer.middleware.js'

const router = express.Router()


//add blog
router.post("/add-blog",upload.single("coverImg"),jsonAuthMiddleware,isAdmin,addBlog)


//get blog
router.get("/get-blogs",getBlog)


//get blog by id
router.get("/get-blog/:id",getBlogById)


//update blog
router.put("/update-blog/:id", upload.single("coverImg"), jsonAuthMiddleware, isAdmin, updateBlogById);


//delete blog
router.delete("/delete-blog/:id",jsonAuthMiddleware,isAdmin,deleteBlogById)


//search blog
router.get("/search",searchBlog)


router.get("/my-blogs", jsonAuthMiddleware, isAdmin, getUserSpecifBlog);

export default router


