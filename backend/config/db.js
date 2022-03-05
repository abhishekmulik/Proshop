import mongoose from "mongoose";

const connectDb=async()=>{
    // console.log(process.env.MONGO_URI)
    try{
        const conn=await mongoose.connect('mongodb+srv://abhishekmulik:thisismongodb@cluster0.mheco.mongodb.net/proshop',{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Mongo Db connected ${conn.connection.host}`)
    }catch(err){
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}
// connectDb()
export default connectDb