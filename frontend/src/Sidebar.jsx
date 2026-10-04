import "./Sidebar.css";
import { ClaudeContext } from "./ClaudeContext";
import { useEffect, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { authFetch } from "./api.js";

function Sidebar() {
    const { threads, setThreads, currentThreadId, setCurrentThreadId,
        setPrevChats, setNewChat, setReply, setPrompt, user, logout,
        sidebarOpen, setSidebarOpen } = useContext(ClaudeContext);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const initials = (user?.username || "?")
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


    const getAllThreads = async () => {
        try {
            const response = await authFetch("/allThreads");
            if (!response.ok) return;
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
        setSidebarOpen(false);   // on mobile, show the chat after picking
    };

    const changeThread = async (newThreadId) => {
        setCurrentThreadId(newThreadId);
        setSidebarOpen(false);
        try {
            const response = await authFetch(`/thread/${newThreadId}`);
            if (!response.ok) return;
            const messages = await response.json();
            setPrevChats(messages);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        setOpenMenuId(null);
        try {
            const response = await authFetch(`/thread/${threadId}`, { method: "DELETE" });
            if (!response.ok) return;
            setThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if (threadId === currentThreadId) startNewChat();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const closeMenu = () => {
            setOpenMenuId(null);
            setUserMenuOpen(false);
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, []);

    useEffect(() => {
        getAllThreads();

    }, [currentThreadId]);



    return (
        <div className={`sideBar ${sidebarOpen ? "open" : ""}`}>
            <div className="topPart">
                <h3>Claude</h3>
                {/* close button, only visible on mobile */}
                <button className="sidebarClose" onClick={() => setSidebarOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="newChat">
                <button onClick={startNewChat}><i className="fa-solid fa-plus"></i> New chat</button>
            </div>

            <div className="chatHistory">
                <p className="sectionLabel">Recents</p>
                <ul>
                    {threads?.map(thread => (
                        <li
                            key={thread.threadId}
                            title={thread.title}
                            className={openMenuId === thread.threadId ? "menuOpen" : ""}
                            onClick={() => changeThread(thread.threadId)}
                        >
                            <span className="threadTitle">{thread.title}</span>

                            <button
                                className="threadMenuBtn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === thread.threadId ? null : thread.threadId);
                                }}
                            >
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>

                            {openMenuId === thread.threadId && (
                                <div className="threadMenu" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => deleteThread(thread.threadId)}>
                                        <i className="fa-regular fa-trash-can"></i> Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}

                </ul>

            </div>

            <div
                className="userInfo"
                onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                }}
            >
                <span className="avatar">{initials}</span>
                <span className="userName">{user?.username}</span>

                {userMenuOpen && (
                    <div className="userMenu" onClick={(e) => e.stopPropagation()}>
                        <p className="userEmail">{user?.email}</p>
                        <button onClick={logout}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Sidebar;