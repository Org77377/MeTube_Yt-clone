import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
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
                <SideMenu/>
        </>
    );
}

export default Navbar;