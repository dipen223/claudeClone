import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
});


const User = model("User",UserSchema);
export default User;
