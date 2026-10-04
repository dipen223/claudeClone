import React, { useContext,useState,useEffect } from 'react';
import './ChatWindow.css'
import Chat from "./Chat.jsx";
import { ClaudeContext } from './ClaudeContext.jsx';
import {ScaleLoader} from "react-spinners";


const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currentThreadId, prevChats,setPrevChats, setNewChat } = useContext(ClaudeContext);

  const [loading,setLoading] = useState(false);



  const getReply = async () => {
    if(!prompt.trim()) return;
    setNewChat(false);
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({message: prompt,
        threadId: currentThreadId})
      
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, options);
      const data = await response.json();
      setReply(data.reply);

    } catch (err) {
      console.log(err);

    }
    setLoading(false);

  }


  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  return (
    <div className='mainWindow'>
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

      <div className='chatInput'>
        <div className="inputBox">
          <input type="text" placeholder='How can I help you today?'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? getReply():''}



          />
          <button className='sendButton' onClick={getReply}>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>



    </div>
  )
}

export default ChatWindow;