import Thread from "../models/thread.schema.js";


const getThreads = async(req,res) =>{
    try{

        const allThreads = await Thread.find({}).sort({updatedAt:-1});
        res.json(allThreads);


    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to get threads."})
    }


}


const getThread = async(req,res) =>{
    try{
        const threadId = req.params.id;
        const thread = await Thread.findOne({threadId});
       if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);  

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to get the thread"})
    }


}



const deleteThread = async (req, res) => {
    try {
        const threadId = req.params.id;
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete the thread" });
    }
};



export  {getThreads,getThread,deleteThread}