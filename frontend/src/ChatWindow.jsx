import React from 'react';
import './ChatWindow.css'
import Chat from "./Chat.jsx";

const ChatWindow = () => {
  return (
    <div className='mainWindow'>
      <div className="title">
        <h1>Back at it,Dipen</h1>
      </div>

      
        <Chat></Chat>

        <div className='chatInput'>
          <div className="inputBox">
            <input type="text" placeholder='How can I help you today?'/>
            <button className='sendButton'>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>

      

    </div>
  )
}

export default ChatWindow;