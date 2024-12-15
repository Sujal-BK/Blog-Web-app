import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js'

export const generateToken = (userData) => {
    const payload = {
        email: userData.email,

    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}


export const jsonAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log('Token : ', token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.currentUser = { email: verifyToken.email }
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token or Unauthorized access..."
        })

    }
}


export const isAdmin = async (req, res, next) => {
    console.log("this is user info : ",req.currentUser);
    
    if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User..."
        });
      }
    try {
        const ifUserAdmin = await User.findOne({ email: req.currentUser.email })
        if (!ifUserAdmin) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User..."
            })
        }
        if (ifUserAdmin.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "Unauthorized User..."
            });
        }
       next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Admin Role...",
            error
        })
    }
}