import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
import Home from "../Home/Home";

import "../style.css";

function Navbar() {

    return (
        <>
            <div className="navbar">
                <div className="l-side">
                    <Logo/>
                </div>
                <div className="center">
                    <Search/>
                </div>
                <div className="r-side">
                    <UserMenu/>
                </div>
            </div>
            <div className="main-section">
                <SideMenu className="side"/>
                <Home className="home"/>
            </div>
        </>
    );
}

export default Navbar;