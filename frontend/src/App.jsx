import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { ClaudeContext } from "./ClaudeContext.jsx";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1);
  const [prevChats, setPrevChats] = useState([]);
  const [threads, setThreads] = useState([]);

  const [newChat, setNewChat] = useState(true);



  const providerValues = { prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId, newChat, setNewChat, prevChats, setPrevChats, threads, setThreads };






  return (
    <div className="main">
      <ClaudeContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<ChatWindow />} />
          <Route path="/chat/:threadId" element={<ChatWindow />} />
        </Routes>

      </ClaudeContext.Provider>


    </div>
  )
}
export default App
