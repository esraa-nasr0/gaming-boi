import mongoose from "mongoose";

let cached = (global as any).mongoose || {conn:null, promise:null};

const connect = async () => {
    if(cached.conn) return cached.conn;
    cached.promise = 
    cached.promise || 
    mongoose.connect(process.env.MONGO_URL!, {dbName:"gamehub" , bufferCommands: false})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
    cached.conn = await cached.promise;
    return cached.conn;
}
export default connect;
    
