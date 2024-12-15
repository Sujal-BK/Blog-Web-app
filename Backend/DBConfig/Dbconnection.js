import mongoose from "mongoose";

const DBConnection = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected Successfully...");
        
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`);
        
    }
}

export default DBConnection