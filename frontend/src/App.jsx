import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {ClaudeContext} from "./ClaudeContext.jsx";


function App(){
  const providerValues = {};
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
