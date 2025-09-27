import "../style.css";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

function Logo(){

    const {switchSidebtn} = useContext(SidebarBtn);

    return (
        <>
            <div id='logoNav'>
                <li className="icon" onClick={()=>switchSidebtn()}>
                    <i className="bi bi-list"></i>
                </li>
                <li className="logo">
                    <img src="/main_logo.svg" alt="app_logo" />
                    <small className="logo-txt"> <b><Link to={'/'}>MeTube</Link></b></small>
                </li>
            </div>
            
        </>
    );
}

export default Logo;