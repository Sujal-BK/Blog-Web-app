import express from 'express'
import { deleteUser, getUser, login, register } from '../Controllers/user.controller.js';
import { isAdmin, jsonAuthMiddleware } from '../Middlewares/auth.middleware.js';

const router = express.Router()


//user registration
router.post("/register",register)


//user login
router.post("/login",login)


//get users
router.get("/get-users",jsonAuthMiddleware,isAdmin,getUser)


//delete user
router.delete("/delete-user/:id",jsonAuthMiddleware,isAdmin,deleteUser)


//protected admin
router.get("/admin",jsonAuthMiddleware,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected user
router.get("/user",jsonAuthMiddleware,(req,res)=>{
    res.status(200).send({ok:true})
})


export default router;