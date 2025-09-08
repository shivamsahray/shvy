import mongoose from "mongoose";
import { buffer } from "stream/consumers";
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
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
    

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
    }

    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}