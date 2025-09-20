import "../style.css";

function Logo(){

    return (
        <>
            <div id='logoNav'>
                <li className="icon">
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