import mongoose from "mongoose";

const userSechmea= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unquie:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})


const UserModel= mongoose.model('user',userSechmea)

export default UserModel