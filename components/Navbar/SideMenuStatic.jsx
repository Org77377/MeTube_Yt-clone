import "../style.css";
import { Link } from "react-router-dom";

function SideMenuStatic(){
    return(
        <>
            <div className={`side-menu-sm`}>
                <div className={`side-container-sm`}>
                        <Link to="/">
                    <div className={`content-sm`}>
                        <i className="bi bi-house-fill"></i>
                        <li>Home</li>
                    </div>
                        </Link>
                    <div className={`content-sm`}>
                        <i className="bi bi-file-play-fill"></i>
                        <li>Shorts</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-bookmark-check-fill"></i>
                        <li>Subsriptions</li>
                    </div>

                    <hr /> 

                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-person-circle"></i>
                        <li>You</li>
                    </div>
                    <div className={`content-sm`}>
                        <i className="bi bi-clock-history"></i>
                        <li>History</li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideMenuStatic;