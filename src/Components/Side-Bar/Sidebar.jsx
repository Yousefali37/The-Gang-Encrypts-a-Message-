import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { Home } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';

// Material UI Icons
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
function Sidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [active, setActive] = useState("home");

    const locations = useMemo(() => [
        "Simplified-Des", "Polyalphabetic", "Playfair-Cipher", "RC4"
    ], []);

    useEffect(() => {
        const currentLocation = locations.find(loc => location.pathname.includes(loc));
        setActive(currentLocation || "home");
    }, [location.pathname, locations]);

    const iconMapping = {
        "Simplified-Des": <VpnKeyOutlinedIcon style={{ color: "rgb(139, 92, 246)" }} />,
        "Playfair-Cipher": <WindowOutlinedIcon style={{ color: "rgb(59, 130, 246)" }} />,
        // "Hill-Cipher": <FingerprintOutlinedIcon style={{ color: "rgb(20, 184, 166)" }} />,
        "Polyalphabetic": <SortOutlinedIcon style={{ color: "rgb(245, 158, 11)" }} />,
        "RC4" : <KeyOffOutlinedIcon style={{ color: "rgb(246, 92, 92)" }} />
    };

    return (
        <div  className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{
            minWidth: isCollapsed ? "70px" : "233px"
        }}>
            <button className='sidebar__button' onClick={() => {
                setIsCollapsed(!isCollapsed);
            }}>
                <CloseFullscreenIcon />
            </button>

            <p className="sidebar__title">
                <VpnKeyOutlinedIcon />
                {!isCollapsed && " IACIP"}
            </p>

            <div className='sidebar__links'>
                <Link to={"/"} className={`sidebar__link ${active === "home" && "sidebar__link-active"}`} onClick={() => {
                    setActive("home");
                }}>
                    <Home className="sidebar__icon" />
                    <span className="sidebar__text">{!isCollapsed && "Home"}</span>
                </Link>

                {
                    locations.map((e) => (
                        <Link key={e} to={`${e}`} className={`sidebar__link ${active === e && "sidebar__link-active"}`}>
                            {iconMapping[e]}
                            <span className="sidebar__text">{!isCollapsed && e.replace(/-/g, ' ')}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;
