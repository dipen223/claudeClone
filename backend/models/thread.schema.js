import { Schema,model } from "mongoose";
import MessageSchema from "./message.schema.js";

const ThreadSchema = new Schema({
    threadId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
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