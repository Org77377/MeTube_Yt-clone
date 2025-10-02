import "../style.css";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
//side menu component 
function SideMenu(){

    // const {sidebtn} = useContext(SidebarBtn);
    // setting class sm for smaller buttons when toggled 
    // const  = sidebtn? "": '-sm';

    return(
        <>
            <div className={`side-menu`}>
                <div className={`side-container`}>
                    <div className={`content`}>
                        <i class="bi bi-house-fill"></i>
                        <li>Home</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-file-play-fill"></i>
                        <li>Shorts</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-bookmark-check-fill"></i>
                        <li>Subsriptions</li>
                    </div>

                    <hr /> 

                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content`}>
                        <i class="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideMenu;