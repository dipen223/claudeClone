import Thread from "../models/thread.schema.js";
import getOpenAIApiResponse from "../utils/openai.js";


const chatHandler = async(req,res) =>{
    const {threadId,message} = req.body;
    if(!threadId || !message){
        return res.status(400).json({message:"Missing required threadId and or message!"});
    }
    try{
       const thread =  await Thread.findOne({threadId});
       if(!thread){
        //create a new thread
        thread  = new Thread({
            threadId,
            title:message,
            messages:[{role:"user",content:message}]
        });
       }else{
        thread.messages.push({role:"user",content:message});
       }

       const assistantReply = await getOpenAIApiResponse(message);
       thread.messages.push({role:"assistant",content:assistantReply});
       thread.updatedAt = new Date();
       await thread.save()


       res.json({reply:assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"failed to send a chat!"});

    }
}


export default chatHandler;