import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    host :  'smtp.gmail.com',
    port : process.env.MAIL_PORT,
    secure : false,
    auth:{
        user:process.env.USER,
        pass :process.env.PASS_KEY
    }
})

export default transporter