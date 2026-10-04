import React from 'react'
import './Chat.css';
import { useContext,useState,useEffect } from 'react';
import { ClaudeContext } from './ClaudeContext';
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


const Chat = () => {
  const { newChat,prevChats,reply } = useContext(ClaudeContext);
  const  [latestReply,setLatestReply] =  useState(null);

  useEffect(() =>{
    if(reply === null){       // loaded an old thread: no typing effect, show everything
      setLatestReply(null);
      return;
    }
    if(!prevChats?.length) return;
    const content = reply.split(" ");

    setLatestReply("");   // clear the previous reply so it doesn't flash before typing starts
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0,idx+1).join(" "));
      idx++;

      if(idx >= content.length){
        clearInterval(interval)
      }

    },40);

    return () => clearInterval(interval);
  },[prevChats,reply])
  return(<>
      {newChat && <h1>Back at it ,Dipen</h1>}
      {prevChats?.length > 0 && <div className='chats'>
      
        {(latestReply === null ? prevChats : prevChats.slice(0,-1)).map((chat,idx) => (
          <div className={chat.role === "user" ? "userDiv":"claudeDiv"} key={idx}>
            {chat.role === "user"
              ? <p className="user">{chat.content}</p>
              : <div className="claude">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                </div>}
          </div>
        ))}

        
        {latestReply != null &&
          <div className="claudeDiv" key="typing">
            <div className="claude">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
            </div>
          </div>}
      </div>}
    </>
  )
}

export default Chat;