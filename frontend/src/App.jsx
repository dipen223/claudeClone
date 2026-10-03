import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {ClaudeContext} from "./ClaudeContext.jsx";
import { useState } from 'react';

import {v1 as uuidv1} from "uuid";    

function App(){
  const [prompt,setPrompt]  = useState("");
  const [reply,setReply] = useState(null);
  const [currentThreadId,setCurrentThreadId] = useState(uuidv1);
  const providerValues = {prompt,setPrompt,reply,setReply,currentThreadId,setCurrentThreadId};
  return (
    <div className="main">
      <ClaudeContext.Provider value={providerValues}>
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
      </ClaudeContext.Provider>


    </div>
  )
}
export default App
