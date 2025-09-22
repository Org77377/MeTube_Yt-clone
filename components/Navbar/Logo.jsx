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
                    <i class="bi bi-list"></i>
                </li>
                <li className="logo">
                    <img src="/main_logo.svg" alt="app_logo" />
                    <small> <b><Link to={'/'}>Me Tube</Link></b></small>
                </li>
            </div>
            
        </>
    );
}

export default Logo;