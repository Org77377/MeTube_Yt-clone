import "../style.css";

function SideMenu(){
    
    return(
        <>
            <div className="side-menu">
                <div className="side-container">
                    {/* button to hide menu  */}
                    <div className="content">
                        <span><i class="bi bi-house-fill"></i></span>
                        <li>Home</li>
                    </div>
                    <div className="content">
                        <span><i class="bi bi-file-play-fill"></i></span>
                        <li>Shorts</li>
                    </div>
                    <div className="content">
                        <span><i class="bi bi-bookmark-check-fill"></i></span>
                        <li>Subsriptions</li>
                    </div>

                    <hr /> 

                    <div className="content">
                        <span><i class="bi bi-person-circle"></i></span>
                        <li>You</li>
                    </div>
                    <div className="content">
                        <span><i class="bi bi-clock-history"></i></span>
                        <li>History</li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideMenu;