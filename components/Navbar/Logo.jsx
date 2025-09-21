import "../style.css";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";

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
                    <small> <b>Me Tube</b></small>
                </li>
            </div>
            
        </>
    );
}

export default Logo;