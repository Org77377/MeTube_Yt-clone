import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
import SideMenuStatic from "./SideMenuStatic";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import Home from "../Home/Home";

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
            <SideMenuStatic/>
            {sidebtn?<SideMenu/>:''}
        </>
    );
}

export default Navbar;