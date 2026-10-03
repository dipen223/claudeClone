import React, { useContext,useState } from 'react';
import './ChatWindow.css'
import Chat from "./Chat.jsx";
import { ClaudeContext } from './ClaudeContext.jsx';
import {ScaleLoader} from "react-spinners";


const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currentThreadId } = useContext(ClaudeContext);

  const [loading,setLoading] = useState(false);



  const getReply = async () => {
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
      console.log("err");

    }
    setLoading(false);

  }
  return (
    <div className='mainWindow'>
      <div className="title">
        <h1>Back at it,Dipen</h1>
      </div>


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