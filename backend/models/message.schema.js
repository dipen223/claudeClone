import mongoose,{Schema} from "mongoose";

const MessageSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","assistant"],
        required:true,
    }
},
{
    timestamps:true
}
);


export default MessageSchema;