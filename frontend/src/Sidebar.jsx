import "./Sidebar.css";
import { Link } from "react-router-dom";
import { ClaudeContext } from "./ClaudeContext";
import { useEffect,useContext } from "react";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
   const { threads, setThreads, currentThreadId, setCurrentThreadId,
        setPrevChats, setNewChat, setReply, setPrompt } = useContext(ClaudeContext);


    const getAllThreads = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allThreads`);
            const data = await response.json();
            const filtered = data.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setThreads(filtered);

        } catch (err) {
            console.log(err);
        }
    };
    const startNewChat = () => {
    setCurrentThreadId(uuidv1());
    setPrevChats([]);
    setNewChat(true);
    setReply(null);
    setPrompt("");
};

    const changeThread = async (newThreadId) => {
        setCurrentThreadId(newThreadId);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/thread/${newThreadId}`);
            if (!response.ok) return; 
            const messages = await response.json();
            setPrevChats(messages);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    };




    useEffect(() => {
        getAllThreads();

    }, [currentThreadId]);



    return (
        <div className="sideBar">
            <div className="topPart">
                <h3>Claude</h3>
                <div className="switchClaude">
                    <Link to="/chat"><i className="fa-regular fa-comments"></i></Link>
                    <Link to="/code"><i className="fa-solid fa-code"></i></Link>
                </div>


            </div>
            <div className="newChat">
               <Link to="/" onClick={startNewChat}><i className="fa-solid fa-plus"></i> New chat</Link>

            </div>

            <div className="nav">
                <ul>
                    <li><Link to="/projects"><i className="fa-regular fa-folder"></i> Projects</Link></li>
                    <li><Link to="/artifacts"><i className="fa-solid fa-shapes"></i> Artifacts</Link></li>
                    <li><Link to="/scheduled"><i className="fa-regular fa-clock"></i> Scheduled</Link></li>
                    <li><Link to="/design"><i className="fa-solid fa-palette"></i> Design</Link></li>
                    <li><Link to="/customize"><i className="fa-solid fa-sliders"></i> Customize</Link></li>

                </ul>
            </div>

            <div className="chatHistory">
                <p className="sectionLabel">Recents</p>
                <ul>
                    {threads?.map(thread => (
                        <li
                            key={thread.threadId}
                            title={thread.title}
                            onClick={() => changeThread(thread.threadId)}
                        >
                            {thread.title}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Sidebar;