import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import DBConnection from './DBConfig/Dbconnection.js'
import blogRouter from './Routers/blog.router.js'
import userRouter from './Routers/user.router.js'


const app = express()



app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000
DBConnection()
app.use("/api/blog",blogRouter)
app.use("/api/auth",userRouter)
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);

})