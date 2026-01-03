import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async()=>{
    mongoose.connection.on('Connected', ()=> console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB;