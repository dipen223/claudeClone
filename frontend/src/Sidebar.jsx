import "./Sidebar.css";
import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div className="sideBar">
            <div className="topPart">
                <h3>Claude</h3>
                <div className="switchClaude">
                    <Link to="/chat"><i className="fa-regular fa-comments"></i></Link>
                    <Link to="/code"><i className="fa-solid fa-code"></i></Link>
                </div>

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

            </div>

        </div>
    )
}

export default Sidebar;