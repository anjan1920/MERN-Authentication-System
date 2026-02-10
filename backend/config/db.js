//connection to mongo db

import mongoose  from "mongoose";

export const connectionDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection successful");
        console.log("host :",conn.connection.host);
        
        
    }catch(err){
        console.log(`MongoDB Connection issue err ${err}`);
        process.exit(1);
        
    }
}