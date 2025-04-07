import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js'

export const generateToken = (userData) => {
    const payload = {
        email: userData.email,
        role: userData.role 

    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn : "1d"
    })
}


export const jsonAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log('Token : ', token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.currentUser = {
            email: verifyToken.email,
            role: verifyToken.role 
        };
        next()

    } catch (error) {
        console.log('Error :' ,error);
        return res.status(401).json({
            success: false,
            message: "Invalid token or Unauthorized access..."
        })

    }
}


export const isAdmin = (req, res, next) => {
    console.log("User Info from Token:", req.currentUser);

    if (!req.currentUser || req.currentUser.role.trim() !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied: Admins only."
        });
    }

    next();
}

