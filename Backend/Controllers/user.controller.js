import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../Middlewares/auth.middleware.js";
export const register = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
            return res.status(404).json({
                success : false,
                message : "All Fields Are Mandatory..."
            })
        }

        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return res.status(404).json({
                success : false,
                message : "User is Reistrated..."
            })
        }

        const hash_password = await bcrypt.hash(password,10)
        const newUser = await User.create({
            username,
            password : hash_password,
            email
        })

        
        return res.status(200).json({
            success : true,
            message : "User Registrated Successfully...",
            newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Registration Error...",
            error
        })
        
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password,role} = req.body
        if(!email || !password || !role){
            return res.status(404).json({
                success : false,
                message : "All Fields Are Mandatory..."
            })
        }
        const newUser = await User.findOne({email})
        if(!newUser){
            return res.status(404).json({
                success : false,
                message : "User Not Found..."
            })
        }
        const hashedPassword = await bcrypt.compare(password,newUser.password)

        if(!hashedPassword){
            return res.status(404).json({
                success : false,
                message : "Invalid Password..."
            })
        }

        const token = generateToken({email:newUser.email,role:newUser.role})

        return res.status(200).json({
            success : true,
            message : "User Login Successfully...",
            token,
            role
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "login Error...",
            error
        })
        
    }
}


export const getUser = async(req,res)=>{
    try {
        const users = await User.find({},'id email role')
        return res.status(200).json({
            success : true,
            message : "User Found Successfully...",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in Getting User...",
            error
        })
        
    }
}


export const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Exist...",
                
            })
        }
        return res.status(200).json({
            success : true,
            message : "user Deleted Successfully..."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in Delete User...",
            error
        })
    }
}