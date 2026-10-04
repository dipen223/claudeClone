import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Login from "./Login.jsx";
import { ClaudeContext } from "./ClaudeContext.jsx";
import { useState } from 'react';

import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1);
  const [prevChats, setPrevChats] = useState([]);
  const [threads, setThreads] = useState([]);

  const [newChat, setNewChat] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);   // only matters on mobile

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  
    setPrevChats([]);
    setThreads([]);
    setReply(null);
    setPrompt("");
    setNewChat(true);
    setCurrentThreadId(uuidv1());
  };

  const providerValues = { prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId, newChat, setNewChat, prevChats, setPrevChats, threads, setThreads, user, setUser, logout, sidebarOpen, setSidebarOpen };


  return (
    <ClaudeContext.Provider value={providerValues}>
      {!user ? (
        <Login />
      ) : (
        <div className="main">
          <Sidebar></Sidebar>
          {/* dark backdrop behind the open sidebar on mobile; tap it to close */}
          {sidebarOpen && <div className="sidebarOverlay" onClick={() => setSidebarOpen(false)}></div>}
          <ChatWindow />

        </div>
      )}
    </ClaudeContext.Provider>
  )
}
export default App
