import React, { useContext,useState,useEffect } from 'react';
import './ChatWindow.css'
import Chat from "./Chat.jsx";
import { ClaudeContext } from './ClaudeContext.jsx';
import {ScaleLoader} from "react-spinners";
import { authFetch } from "./api.js";


const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currentThreadId, prevChats,setPrevChats, setNewChat, setSidebarOpen } = useContext(ClaudeContext);

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
      const response = await authFetch("/chat", options);
      const data = await response.json();
      if (response.ok) setReply(data.reply);

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
      {/* opens the sidebar, only visible on mobile */}
      <button className="menuBtn" onClick={() => setSidebarOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>

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