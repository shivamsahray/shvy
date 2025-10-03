import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URL!;

if(!MONGODB_URI){
    throw new Error("Please define mongodb url in .env file")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectToDatabase() {
    if(cached.conn){
        console.log("Using cached database connection");
        return cached.conn;
    }

    if(!cached.promise){
        console.log("Creating new database connection...");
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
    

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => {
            console.log("New database connection established successfully!");
            return mongoose.connection
        }).catch(err => {
            console.error("MongoDb connection error: ", err);
            cached.promise = null;
            throw err;
        });
    }

    try{
        cached.conn = await cached.promise
    }catch(error){
        throw error;
        cached.promise = null;
    }

    return cached.conn;
}