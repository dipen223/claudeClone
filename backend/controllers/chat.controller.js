import Thread from "../models/thread.schema.js";
import getOpenAIApiResponse from "../utils/openai.js";


const chatHandler = async(req,res) =>{
    const {threadId,message} = req.body;
    if(!threadId || !message){
        return res.status(400).json({message:"Missing required threadId and or message!"});
    }
    try{
       let thread =  await Thread.findOne({ threadId, userId: req.userId });
       if(!thread){
       
        thread  = new Thread({
            threadId,
            userId: req.userId,
            title:message,
            messages:[{role:"user",content:message}]
        });
       }else{
        thread.messages.push({role:"user",content:message});
       }
       const history = thread.messages
           .slice(-20)                
           .map(({ role, content }) => ({ role, content }));

       const assistantReply = await getOpenAIApiResponse(history);
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