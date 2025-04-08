import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../Middlewares/auth.middleware.js";
import transporter from "../Utils/nodeMailerConfig.js";
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const otpStore = {}


export const register = async(req,res)=>{
    try {
        const {username,email,password,role} = req.body
        if(!username || !email || !password ||!role){
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
            email,
            role
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
        const {email,password} = req.body
        if(!email || !password ){
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

        const token = generateToken({_id : newUser._id,email:newUser.email,role:newUser.role})

        return res.status(200).json({
            success : true,
            message : "User Login Successfully...",
            token,
            role :newUser.role
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



export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Incoming email:", email);
  
      const user = await User.findOne({ email }); // ✅ Make sure `User` is imported!
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "This email doesn't exist",
        });
      }
  
      const otp = crypto.randomInt(100000, 999999).toString();
      otpStore[email] = otp;
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email, 
        subject: 'One Time Password',
        text: `Your OTP is: ${otp}`,
      
    });
  
      return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
      });
    } catch (error) {
      console.error("🔥 Forgot Password Controller Error:", error); // 👈 check your terminal!
      return res.status(500).json({
        success: false,
        message: "Error in forgot password...",
        error: error.message, // make it readable
      });
    }
  };
  

export const verifyAndChangePassword = async(req,res)=>{
    try {
        const {email,otp,newPassword} = req.body
        if(email==""){
            return res.status(400).json({
                success: false,
                message: 'Please Enter Email'
            })
        } 
        if(otpStore[email]!==otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  doesn't exist"
            });
        }
        const hash_password = await bcrypt.hash(newPassword,10)
        user.password = hash_password
        await user.save();

        delete otpStore[email];

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
            hash_password
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}