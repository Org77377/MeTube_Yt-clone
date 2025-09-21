import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import "../style.css";


function Navbar() {

    const {sidebtn} = useContext(SidebarBtn);

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
                {sidebtn?<SideMenu/>: ""}
        </>
    );
}

export default Navbar;