import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        createdAt: {type: Date, required: true},
        updatedAt: {type: Date, required: true}
    },{
        timestamps: true
})

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,  10);
    }
    next();
})

const User = models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
    