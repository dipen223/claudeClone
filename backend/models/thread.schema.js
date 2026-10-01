import { Schema,model } from "mongoose";
import MessageSchema from "./message.schema";

const ThreadSchema = new Schema({
    threadId: {
        type: String,
        required: true,
        unique: true,
    },  
    title: {
        type: String,
        default: "New Chat",
    },
    messages: [MessageSchema],
   
},
{
    timestamps:true
});

const Thread = model("Thread",ThreadSchema);


export default Thread;